import test from "node:test";
import assert from "node:assert/strict";
import { hasCourseAccess, learningDestination } from "../src/lib/course-access.js";
import { validateEnrolment } from "../src/lib/enrolment-validation.js";

const now = 1000;
const enrolment = { userId: "learner", courseId: "nda", registrationId: "form", paymentId: "paid", status: "active", start: 900, accessEnd: 1100 };
const registration = { id: "form", userId: "learner", courseId: "nda", status: "submitted" };
const payment = { id: "paid", registrationId: "form", userId: "learner", courseId: "nda", mode: "demo", status: "completed" };
const check = (enrolled = enrolment, forms = [registration], payments = [payment], demo = true) => hasCourseAccess(enrolled, "learner", forms, payments, now, demo);

test("requires matching completed form and payment, beyond active enrolment", () => {
  assert.equal(check(), true);
  assert.equal(check(enrolment, []), false);
  assert.equal(check(enrolment, [registration], []), false);
  for (const change of [{ userId: "other" }, { courseId: "cds" }, { status: "pending" }, { registrationId: "other" }]) {
    assert.equal(check(enrolment, [registration], [{ ...payment, ...change }]), false);
  }
  assert.equal(check(enrolment, [{ ...registration, status: "draft" }]), false);
  assert.equal(check(enrolment, [{ ...registration, userId: "other" }]), false);
});

test("rejects old enrolments, expired, future, and suspended access", () => {
  for (const change of [{ registrationId: undefined }, { paymentId: undefined }, { accessEnd: now },
    { accessEnd: "1100" }, { start: 1001 }, { status: "suspended" }, { userId: "other" }]) {
    assert.equal(check({ ...enrolment, ...change }), false);
  }
});

test("demo payments never unlock production access; live payments require verification", () => {
  assert.equal(check(enrolment, [registration], [payment], false), false);
  assert.equal(check(enrolment, [registration], [{ ...payment, mode: "live", status: "pending" }], false), false);
  assert.equal(check(enrolment, [registration], [{ ...payment, mode: "live", status: "verified" }], false), true);
});

const form = { courseId: "nda", name: "Sample Learner", email: "LEARNER@example.invalid", phone: "9876543210", location: "Sample city", password: "sample-password", consent: true };
test("validates enrolment, requires consent and password, normalises email", () => {
  assert.equal(validateEnrolment(form, false).fields.email, "learner@example.invalid");
  for (const change of [{ password: "short" }, { consent: false }, { name: "" }, { email: "invalid" }, { phone: "invalid" }, { location: "" }, { courseId: [] }]) {
    assert.ok(validateEnrolment({ ...form, ...change }, false).error);
  }
  assert.equal(validateEnrolment({ ...form, password: undefined }, true).error, undefined);
  assert.ok(validateEnrolment(null, false).error);
});

test("post-login destinations stay within course and portal routes", () => {
  assert.equal(learningDestination("/courses/nda/enrol"), "/courses/nda/enrol");
  assert.equal(learningDestination("/portal/learn/nda/tests"), "/portal/learn/nda/tests");
  for (const value of ["https://example.invalid", "//example.invalid", "/courses/../enrol", ["/portal"], undefined]) {
    assert.equal(learningDestination(value), "/portal");
  }
});
