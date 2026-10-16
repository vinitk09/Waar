import test from "node:test";
import assert from "node:assert/strict";
import { gradeTest, publicTest } from "../src/lib/test-grading.js";

const paper = {
  id: "sample-v1", title: "Sample test", sample: true,
  questions: [
    { id: "one", prompt: "First question", options: ["A", "B", "C"], correct: 0, explanation: "A is correct." },
    { id: "two", prompt: "Second question", options: ["X", "Y"], correct: 1, explanation: "Y is correct." },
  ],
};

test("scores answers using the answer key, including zero-valued choices", () => {
  const result = gradeTest(paper, { one: 0, two: 0 });
  assert.equal(result.score, 1);
  assert.equal(result.total, 2);
  assert.equal(result.percent, 50);
  assert.equal(result.review[1].correct, 1);
  assert.equal(result.review[1].selected, 0);
  assert.equal(result.review[1].explanation, "Y is correct.");
  assert.equal(gradeTest(paper, { one: 0, two: 1 }).score, 2);
  assert.equal(gradeTest(paper, { one: 2, two: 0 }).score, 0);
});

test("rejects incomplete, injected, or out-of-range answer sets", () => {
  for (const answers of [null, [], {}, { one: 0 }, { one: 0, two: 2 },
    { one: -1, two: 0 }, { one: "0", two: 1 }, { one: 0.5, two: 1 },
    { one: 0, two: 1, injected: 0 }, { one: 0, substituted: 1 }]) {
    assert.throws(() => gradeTest(paper, answers), /Answer every question/);
  }
});

test("question payloads omit answer keys and explanations until submission", () => {
  const payload = publicTest(paper);
  assert.equal(payload.questions.length, 2);
  assert.equal(payload.sample, true);
  for (const question of payload.questions) {
    assert.deepEqual(Object.keys(question).sort(), ["id", "options", "prompt"]);
    assert.equal("correct" in question, false);
    assert.equal("explanation" in question, false);
  }
});
