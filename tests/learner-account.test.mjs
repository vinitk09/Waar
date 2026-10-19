import test from "node:test";
import assert from "node:assert/strict";
import { validateSignup } from "../src/lib/signup-validation.js";
import { learnerPurchases } from "../src/lib/learner-purchases.js";

const signup = { name: "Learner Name", email: " LEARNER@example.invalid ", password: "sample-password", confirmPassword: "sample-password", consent: true };
test("signup normalises identity and rejects invalid account details", () => {
  assert.deepEqual(validateSignup(signup).fields, { name: "Learner Name", email: "learner@example.invalid", password: "sample-password" });
  for (const change of [{ name: " " }, { name: "a".repeat(101) }, { email: "invalid" }, { email: [] }, { password: "short" }, { password: "a".repeat(129) }, { confirmPassword: "different" }, { consent: false }]) {
    assert.ok(validateSignup({ ...signup, ...change }).error);
  }
  for (const input of [null, [], "invalid"]) assert.ok(validateSignup(input).error);
});

const registration = { id: "registration", userId: "learner", courseId: "nda", status: "submitted" };
const payment = { id: "payment", userId: "learner", courseId: "nda", registrationId: registration.id, mode: "live", status: "verified" };
const enrolment = { userId: "learner", courseId: "nda", registrationId: registration.id, paymentId: payment.id, status: "active", start: 900, accessEnd: 1100 };
const store = { registrations: [registration], payments: [payment], enrolments: [enrolment] };
const history = (data = store, allowDemo = false) => learnerPurchases(data, "learner", 1000, allowDemo);

test("purchase history retains paid courses after access expires", () => {
  assert.equal(history()[0].status, "active");
  const ended = history({ ...store, enrolments: [{ ...enrolment, accessEnd: 999 }] })[0];
  assert.equal(ended.status, "expired");
  assert.equal(ended.payment.id, payment.id);
  assert.equal(history({ ...store, enrolments: [] })[0].status, "unavailable");
  assert.equal(history({ ...store, payments: [] })[0].status, "pending");
});

test("history cannot expose another learner's registrations or claim mismatched payments", () => {
  assert.deepEqual(history({ ...store, registrations: [{ ...registration, userId: "other" }] }), []);
  for (const change of [{ userId: "other" }, { courseId: "other" }, { registrationId: "other" }, { status: "pending" }]) {
    const row = history({ ...store, payments: [{ ...payment, ...change }] })[0];
    assert.equal(row.payment, null);
    assert.equal(row.status, "pending");
  }
  assert.deepEqual(history({}), []);
});

test("demo purchases are labelled without enabling production access", () => {
  const demoStore = { ...store, payments: [{ ...payment, mode: "demo", status: "completed" }] };
  assert.equal(history(demoStore)[0].status, "demo");
  assert.equal(history(demoStore)[0].payment.mode, "demo");
  assert.equal(history(demoStore, true)[0].status, "active");
});
