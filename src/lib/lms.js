import "server-only";
import { randomBytes, createHash, scryptSync, timingSafeEqual } from "node:crypto";
import { readFile, mkdir, writeFile, rename } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { courses } from "@/data/courses";
import { courseTests } from "@/lib/test-series";
import { gradeTest } from "@/lib/test-grading";
import { hasCourseAccess } from "@/lib/course-access";

const directory = path.join(process.cwd(), ".data");
const file = path.join(directory, "lms.json");
export const sessionCookie = "waarr_session";
let queue = Promise.resolve();
const hash = value => createHash("sha256").update(value).digest("hex");
export const demoPaymentsEnabled = () => process.env.NODE_ENV === "development";

function permitted(store, enrolment, userId, now = Date.now()) {
  return hasCourseAccess(enrolment, userId, store.registrations ?? [], store.payments ?? [], now, demoPaymentsEnabled());
}

function initialStore() {
  return { users: [], sessions: [], enrolments: [], progress: {} };
}

async function readStore() {
  try { return JSON.parse(await readFile(file, "utf8")); }
  catch (error) { if (error.code === "ENOENT") return initialStore(); throw error; }
}

async function mutate(operation) {
  const result = queue.then(async () => {
    const store = await readStore();
    const value = await operation(store);
    await mkdir(directory, { recursive: true });
    const temporary = `${file}.${randomBytes(8).toString("hex")}.tmp`;
    await writeFile(temporary, JSON.stringify(store), { mode: 0o600 });
    await rename(temporary, file);
    return value;
  });
  queue = result.catch(() => {});
  return result;
}

export async function currentLearner() {
  // Session and enrolment expiry must use the current request's time, never a prerender.
  await connection();
  const now = Date.now();
  const token = (await cookies()).get(sessionCookie)?.value;
  if (!token) return null;
  const store = await readStore();
  const session = store.sessions.find(item => item.hash === hash(token) && item.expires > now);
  if (!session) return null;
  const user = store.users.find(item => item.id === session.userId);
  if (!user || user.demo) return null;
  return { user: { id: user.id, name: user.name, email: user.email }, enrolments: store.enrolments.filter(item => permitted(store, item, user.id, now)), progress: store.progress[user.id] ?? {} };
}

export async function startSession({ demo, email, password }) {
  if (demo) return null;
  return mutate(store => {
    const user = store.users.find(item => !item.demo && item.email?.toLowerCase() === email?.toLowerCase());
    const salt = user?.salt ?? "invalid-user-salt";
    const candidate = scryptSync(password ?? "", salt, 64);
    const stored = user?.passwordHash ? Buffer.from(user.passwordHash, "hex") : Buffer.alloc(64);
    if (!timingSafeEqual(candidate, stored) || !user) return null;
    const token = randomBytes(32).toString("hex");
    store.sessions = store.sessions.filter(item => item.expires > Date.now());
    store.sessions.push({ hash: hash(token), userId: user.id, expires: Date.now() + 8 * 3600000 });
    return token;
  });
}

export async function endSession(token) {
  if (token) await mutate(store => { store.sessions = store.sessions.filter(item => item.hash !== hash(token)); });
}

export function learningContent(courseId) {
  const course = courses.find(item => item.slug === courseId);
  if (!course) return null;
  // Demonstration content is explicitly separate from approved course teaching material.
  const lessons = [
    { id: "welcome", title: "Welcome & your preparation goals", section: "Getting started", body: "Sample lesson: identify your learning goal and the preparation support you want to discuss with your mentor. This demonstration illustrates the learning interface; it is not the approved course syllabus." },
    ...course.focus.map((topic, index) => ({ id: `topic-${index + 1}`, title: topic, section: "Course focus", body: `Sample lesson workspace for ${topic}. Approved videos, lesson notes and teaching activities will be attached by the course team. No actual teaching video has been supplied yet.` })),
    { id: "review", title: "Review & next steps", section: "Reflect & improve", body: "Sample review: record what you have understood, identify a question for your mentor and decide your next learning action. Marking this lesson complete records only your own completion status, not attendance or an assessment result." },
  ];
  return { course, lessons, resources: [{ id: `${courseId}-study-plan`, title: "Sample study planning worksheet", lesson: "welcome", format: "TXT", sample: true }] };
}

export function demoTimetable(enrolments) {
  const tomorrow = new Date(); tomorrow.setUTCDate(tomorrow.getUTCDate() + 1); tomorrow.setUTCHours(12, 30, 0, 0);
  return enrolments.map((item, index) => ({ id: `${item.id}-session`, courseId: item.courseId, title: "Sample orientation & preparation planning", startsAt: new Date(tomorrow.getTime() + index * 86400000).toISOString(), endsAt: new Date(tomorrow.getTime() + index * 86400000 + 3600000).toISOString(), faculty: "Demo faculty", batch: item.batch, status: "scheduled", meetingUrl: null, sample: true }));
}

export async function setCompletion(userId, courseId, lessonId, completed) {
  return mutate(store => {
    if (!store.enrolments.some(item => item.courseId === courseId && permitted(store, item, userId))) return false;
    store.progress[userId] ??= {};
    const done = new Set(store.progress[userId][courseId] ?? []);
    if (completed) done.add(lessonId); else done.delete(lessonId);
    store.progress[userId][courseId] = [...done];
    return true;
  });
}

export function sameOrigin(request) {
  const origin = request.headers.get("origin");
  return Boolean(origin && origin === new URL(request.url).origin);
}

export async function learnerTestAttempts(userId, courseId) {
  const store = await readStore();
  return (store.testAttempts ?? []).filter(item => item.userId === userId && item.courseId === courseId)
    .map(({ userId: _userId, requestId: _requestId, ...attempt }) => attempt).reverse();
}

export async function submitTest(userId, { courseId, testId, answers, requestId }) {
  return mutate(store => {
    if (!store.enrolments.some(item => item.courseId === courseId && permitted(store, item, userId))) {
      return { error: "This course is outside your active enrolments.", status: 403 };
    }
    const test = courseTests(courseId).find(item => item.id === testId);
    if (!test) return { error: "Test not found.", status: 404 };
    store.testAttempts ??= [];
    const existing = store.testAttempts.find(item => item.userId === userId && item.requestId === requestId);
    if (existing) {
      if (existing.courseId !== courseId || existing.testId !== testId) return { error: "Invalid submission reference.", status: 400 };
      const { userId: _userId, requestId: _requestId, ...attempt } = existing;
      return { attempt };
    }
    let result;
    try { result = gradeTest(test, answers); }
    catch (error) { return { error: error.message, status: 400 }; }
    const saved = { id: randomBytes(16).toString("hex"), userId, courseId, testId, requestId,
      title: test.title, sample: test.sample, submittedAt: new Date().toISOString(), ...result };
    store.testAttempts.push(saved);
    const { userId: _userId, requestId: _requestId, ...attempt } = saved;
    return { attempt };
  });
}

export async function courseRegistration(userId, courseId) {
  const store = await readStore();
  const registration = (store.registrations ?? []).find(item => item.userId === userId && item.courseId === courseId);
  return registration ? { id: registration.id } : null;
}

export async function registerForCourse(input, learnerId) {
  return mutate(store => {
    let user = learnerId ? store.users.find(item => item.id === learnerId && !item.demo) : null;
    if (learnerId && !user) return { error: "Please sign in again.", status: 401 };
    if (user && user.email?.toLowerCase() !== input.email) return { error: "Use the email address of your signed-in account.", status: 400 };
    if (!user && store.users.some(item => item.email?.toLowerCase() === input.email)) {
      return { error: "Please sign in to your existing account to enrol in this course.", status: 409 };
    }
    let token;
    if (!user) {
      const salt = randomBytes(16).toString("hex");
      user = { id: randomBytes(16).toString("hex"), name: input.name, email: input.email, salt,
        passwordHash: scryptSync(input.password, salt, 64).toString("hex") };
      store.users.push(user);
      token = randomBytes(32).toString("hex");
      store.sessions.push({ hash: hash(token), userId: user.id, expires: Date.now() + 8 * 3600000 });
    }
    store.registrations ??= [];
    let registration = store.registrations.find(item => item.userId === user.id && item.courseId === input.courseId);
    if (!registration) {
      registration = { id: randomBytes(16).toString("hex"), userId: user.id, courseId: input.courseId,
        name: input.name, email: input.email, phone: input.phone, location: input.location, consent: true,
        status: "submitted", submittedAt: new Date().toISOString() };
      store.registrations.push(registration);
    }
    return { registrationId: registration.id, token };
  });
}

export async function completeDemoPayment(userId, registrationId) {
  if (!demoPaymentsEnabled()) return { error: "Demo payments are unavailable. Live payment setup is pending.", status: 503 };
  return mutate(store => {
    const registration = (store.registrations ?? []).find(item => item.id === registrationId && item.userId === userId && item.status === "submitted");
    if (!registration) return { error: "Submit the course enrolment form first.", status: 404 };
    store.payments ??= [];
    let payment = store.payments.find(item => item.registrationId === registration.id && item.userId === userId && item.mode === "demo" && item.status === "completed");
    if (!payment) {
      payment = { id: randomBytes(16).toString("hex"), registrationId, userId, courseId: registration.courseId,
        mode: "demo", status: "completed", amount: 0, paidAt: new Date().toISOString() };
      store.payments.push(payment);
    }
    let enrolment = store.enrolments.find(item => item.registrationId === registrationId && item.userId === userId);
    if (!enrolment) {
      enrolment = { id: randomBytes(16).toString("hex"), registrationId, paymentId: payment.id,
        userId, courseId: registration.courseId, batch: "Demo enrolment", status: "active",
        start: Date.now(), accessEnd: Date.now() + 30 * 86400000 };
      store.enrolments.push(enrolment);
    }
    if (!permitted(store, enrolment, userId)) return { error: "This course access has ended. Contact the team for renewal.", status: 403 };
    return { courseId: registration.courseId, paymentId: payment.id };
  });
}
