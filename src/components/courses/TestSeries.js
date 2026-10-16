"use client";

import { useRef, useState } from "react";
import Link from "next/link";

const button = "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg bg-[#780c24] px-5 py-3 text-sm font-semibold text-white hover:bg-[#5d091b] disabled:cursor-wait disabled:opacity-60";
const date = value => new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit",
}).format(new Date(value));

export default function TestSeries({ course, tests, initialAttempts }) {
  const [attempts, setAttempts] = useState(initialAttempts);
  const [active, setActive] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [locked, setLocked] = useState(false);
  const [error, setError] = useState("");
  const pending = useRef(null);
  const submitting = useRef(false);
  const heading = useRef(null);
  function focusHeading() { requestAnimationFrame(() => heading.current?.focus()); }
  function start(test) {
    setActive(test); setAnswers({}); setResult(null); setError(""); setLocked(false);
    pending.current = null; focusHeading();
  }
  function overview() {
    setActive(null); setResult(null); setError(""); pending.current = null;
    setLocked(false); focusHeading();
  }
  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    if (Object.keys(answers).length !== active.questions.length) {
      setError("Answer every question before submitting."); return;
    }
    submitting.current = true; setBusy(true); setLocked(true); setError("");
    pending.current ??= { courseId: course.slug, testId: active.id, answers, requestId: crypto.randomUUID() };
    try {
      const response = await fetch("/api/lms/tests", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(pending.current),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status < 500) { pending.current = null; setLocked(false); }
        throw new Error(data.error ?? "Unable to submit. Please try again.");
      }
      setAttempts(items => [data.attempt, ...items.filter(item => item.id !== data.attempt.id)]);
      setResult(data.attempt); setActive(null); pending.current = null; focusHeading();
    } catch (failure) { setError(failure.message); }
    finally { submitting.current = false; setBusy(false); }
  }
  return <div className="mx-auto max-w-[1100px] px-6 py-8 sm:px-10 lg:px-12">
    <Link href={`/portal/learn/${course.slug}`} className="inline-flex min-h-11 items-center text-sm font-semibold text-[#780c24]">← Back to course</Link>
    <p className="mt-6 text-[11px] font-semibold tracking-[0.14em] text-[#780c24] uppercase">{course.title}</p>
    <h1 ref={heading} tabIndex={-1} className="mt-3 text-3xl font-semibold tracking-tight text-[#232025] outline-none sm:text-4xl">{result ? "Your test result" : active ? active.title : "Test series"}</h1>
    {!active && !result && <>
      <p className="mt-4 max-w-[720px] text-sm leading-7 text-[#171717]">Practise with your course tests and review your answers. Each correct answer earns one mark; there is no negative marking. These practice tests are untimed.</p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">{tests.map(test => {
        const previous = attempts.filter(item => item.testId === test.id);
        return <article key={test.id} className="rounded-2xl border border-[#e9e1e4] bg-white p-6">
          {test.sample && <p className="text-xs font-semibold text-[#780c24]">Sample practice · {course.short}</p>}
          <h2 className="mt-3 text-xl font-semibold text-[#302830]">{test.title}</h2>
          <p className="mt-3 text-sm leading-7 text-[#171717]">{test.questions.length} questions · {test.questions.length} marks · Untimed</p>
          {test.sample && <p className="mt-3 text-xs leading-6 text-[#171717]">Demonstration questions. The approved course question bank has not been published.</p>}
          {previous.length > 0 && <p className="mt-4 text-xs text-[#59454e]">{previous.length} attempts · Best score: {Math.max(...previous.map(item => item.percent))}%</p>}
          <button type="button" onClick={() => start(test)} className={`${button} mt-5`}>{previous.length ? "Retake practice test" : "Start practice test"}</button>
        </article>;
      })}</div>
      {!tests.length && <p className="mt-7 rounded-xl border border-[#e9e1e4] bg-white p-6 text-sm">No tests have been published for this course yet.</p>}
      <section aria-labelledby="attempt-history" className="mt-10">
        <h2 id="attempt-history" className="text-xl font-semibold text-[#302830]">Attempt history</h2>
        {attempts.length ? <ol className="mt-5 space-y-3">{attempts.map(attempt => <li key={attempt.id} className="flex flex-col gap-4 rounded-xl border border-[#e9e1e4] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div><h3 className="text-sm font-semibold text-[#302830]">{attempt.title}</h3><p className="mt-2 text-xs leading-6 text-[#171717]">{date(attempt.submittedAt)} IST · {attempt.score}/{attempt.total} marks · {attempt.percent}%</p></div>
          <button type="button" className="min-h-11 cursor-pointer text-sm font-semibold text-[#780c24]" onClick={() => { setResult(attempt); focusHeading(); }}>Review answers<span className="sr-only"> for {attempt.title}, {date(attempt.submittedAt)}</span></button>
        </li>)}</ol> : <p className="mt-4 text-sm text-[#171717]">Your completed test attempts will appear here.</p>}
      </section>
    </>}
    {active && <form onSubmit={submit} className="mt-7">
      <p className="text-sm leading-7 text-[#171717]">{active.sample ? "Sample practice. " : ""}Answer all {active.questions.length} questions, then submit to see your score and explanations.</p>
      <p aria-live="polite" className="mt-3 text-sm font-semibold text-[#780c24]">{Object.keys(answers).length} of {active.questions.length} answered</p>
      <div className="mt-5 space-y-5">{active.questions.map((question, index) => <fieldset key={question.id} disabled={locked} className="rounded-2xl border border-[#e9e1e4] bg-white p-5 sm:p-7">
        <legend className="max-w-full px-2 text-base leading-7 font-semibold text-[#302830]">{index + 1}. {question.prompt}</legend>
        <div className="space-y-3">{question.options.map((option, optionIndex) => <label key={optionIndex} className={`flex min-h-12 cursor-pointer items-start gap-3 rounded-lg border p-4 text-sm leading-6 ${answers[question.id] === optionIndex ? "border-[#780c24] bg-[#faf3f5]" : "border-[#e9e1e4]"}`}>
          <input type="radio" name={question.id} value={optionIndex} required checked={answers[question.id] === optionIndex} onChange={() => setAnswers(values => ({ ...values, [question.id]: optionIndex }))} className="mt-1 size-4 shrink-0 accent-[#780c24]" />{option}
        </label>)}</div>
      </fieldset>)}</div>
      {error && <p role="alert" className="mt-5 rounded-lg bg-[#fff0f2] p-4 text-sm leading-6 text-[#780c24]">{error}{locked && " Your answers are kept for a safe retry."}</p>}
      <div className="mt-6 flex flex-wrap gap-4"><button disabled={busy} className={button} type="submit">{busy ? "Saving result…" : locked ? "Retry submission" : "Submit test"}</button><button type="button" disabled={busy} className="min-h-11 cursor-pointer px-3 text-sm font-semibold text-[#780c24]" onClick={() => { if (window.confirm("Leave this test? Any unsubmitted answers will be discarded.")) overview(); }}>Leave test</button></div>
    </form>}
    {result && <>
      <section aria-label="Score" className="mt-7 rounded-2xl bg-[#780c24] p-6 text-white sm:p-8"><p className="text-sm">{result.title}{result.sample ? " · Sample practice" : ""}</p><p className="mt-4 text-4xl font-semibold">{result.score}/{result.total} <span className="text-lg">marks · {result.percent}%</span></p><p className="mt-4 text-xs leading-6 text-white/80">Saved {date(result.submittedAt)} IST · One mark per correct answer, no negative marking.</p></section>
      <h2 className="mt-8 text-xl font-semibold text-[#302830]">Answer review</h2>
      <ol className="mt-5 space-y-4">{result.review.map((question, index) => <li key={question.id} className="rounded-xl border border-[#e9e1e4] bg-white p-6"><p className="text-xs font-semibold text-[#780c24]">{question.selected === question.correct ? "Correct · 1 mark" : "Incorrect · 0 marks"}</p><h3 className="mt-3 text-base leading-7 font-semibold text-[#302830]">{index + 1}. {question.prompt}</h3><p className="mt-3 text-sm leading-7 text-[#171717]">Your answer: {question.options[question.selected]}</p>{question.selected !== question.correct && <p className="mt-2 text-sm leading-7 font-semibold text-[#40323a]">Correct answer: {question.options[question.correct]}</p>}<p className="mt-3 text-sm leading-7 text-[#171717]">{question.explanation}</p></li>)}</ol>
      <button type="button" onClick={overview} className={`${button} mt-6`}>Back to test series</button>
    </>}
  </div>;
}
