import "server-only";
import { randomBytes, createHash, scryptSync, timingSafeEqual } from "node:crypto";
import { readFile, mkdir, writeFile, rename } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { courses } from "@/data/courses";

const directory = path.join(process.cwd(), ".data");
const file = path.join(directory, "lms.json");
export const sessionCookie = "waarr_session";
let queue = Promise.resolve();
const hash = value => createHash("sha256").update(value).digest("hex");

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
  if (!user) return null;
  return { user: { id: user.id, name: user.name, demo: user.demo }, enrolments: store.enrolments.filter(item => item.userId === user.id && item.status === "active" && item.accessEnd > now), progress: store.progress[user.id] ?? {} };
}

export async function startSession({ demo, email, password }) {
  return mutate(store => {
    let user;
    if (demo) {
      if (process.env.NODE_ENV !== "development" || !["defence", "education"].includes(demo)) return null;
      const id = `demo-${demo}`;
      user = store.users.find(item => item.id === id);
      if (!user) {
        user = { id, name: demo === "defence" ? "Defence learner" : "Education learner", demo: true };
        store.users.push(user);
        for (const courseId of demo === "defence" ? ["nda", "ssb"] : ["cscs-preparation"]) {
          store.enrolments.push({ id: `${id}-${courseId}`, userId: id, courseId, batch: "Local demonstration batch", status: "active", start: Date.now(), accessEnd: Date.now() + 30 * 86400000 });
        }
      }
    } else {
      user = store.users.find(item => !item.demo && item.email?.toLowerCase() === email?.toLowerCase());
      const salt = user?.salt ?? "invalid-user-salt";
      const candidate = scryptSync(password ?? "", salt, 64);
      const stored = user?.passwordHash ? Buffer.from(user.passwordHash, "hex") : Buffer.alloc(64);
      if (!timingSafeEqual(candidate, stored) || !user) return null;
    }
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
    const permitted = store.enrolments.some(item => item.userId === userId && item.courseId === courseId && item.status === "active" && item.accessEnd > Date.now());
    if (!permitted) return false;
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
