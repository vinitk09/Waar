"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inputStyle = "mt-2 min-h-12 w-full rounded-lg border border-[#e3d5db] bg-white px-4 text-sm outline-none focus:border-[#780c24] focus:ring-2 focus:ring-[#780c24]/15 aria-invalid:border-[#780c24]";
const buttonStyle = "inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-[#780c24] px-5 py-3 text-sm font-semibold text-white hover:bg-[#5d091b] disabled:cursor-wait disabled:opacity-60";

export default function EnrolmentForm({ course, learner, registration, demoPayment }) {
  const [registrationId, setRegistrationId] = useState(registration?.id ?? "");
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const pending = useRef(false);
  const router = useRouter();
  async function register(event) {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true; setBusy(true); setError(""); setErrors({});
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/lms/enrolment", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(form), courseId: course.slug, consent: form.get("consent") === "on" }) });
      const result = await response.json();
      if (!response.ok) { setErrors(result.errors ?? {}); throw new Error(result.error ?? "Unable to submit your form."); }
      setRegistrationId(result.registrationId); router.refresh();
    } catch (failure) { setError(failure.message); }
    finally { pending.current = false; setBusy(false); }
  }
  async function pay() {
    if (pending.current) return;
    pending.current = true; setBusy(true); setError("");
    try {
      const response = await fetch("/api/lms/enrolment/payment", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId, confirmDemo: true }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to complete payment.");
      router.replace(`/portal/learn/${course.slug}`); router.refresh();
    } catch (failure) { setError(failure.message); }
    finally { pending.current = false; setBusy(false); }
  }
  return <>
    <ol aria-label="Enrolment steps" className="mb-7 grid grid-cols-2 gap-3 text-sm">
      <li aria-current={!registrationId ? "step" : undefined} className={`rounded-lg border px-4 py-3 ${!registrationId ? "border-[#780c24] bg-[#faf3f5] text-[#780c24]" : "border-[#e9e1e4] text-[#59454e]"}`}>{registrationId ? "✓" : "1."} Enrolment form</li>
      <li aria-current={registrationId ? "step" : undefined} className={`rounded-lg border px-4 py-3 ${registrationId ? "border-[#780c24] bg-[#faf3f5] text-[#780c24]" : "border-[#e9e1e4] text-[#59454e]"}`}>2. {demoPayment ? "Demo payment" : "Payment"}</li>
    </ol>
    {!registrationId ? <form onSubmit={register} className="space-y-5">
      <h2 className="text-2xl font-semibold text-[#302830]">Enrol in {course.title}</h2>
      {!learner && <p className="text-sm leading-7 text-[#171717]">Create your learner account below. Already have an account? <Link href={`/portal/login?next=${encodeURIComponent(`/courses/${course.slug}/enrol`)}`} className="font-semibold text-[#780c24] underline">Sign in first</Link>.</p>}
      {[
        ["name", "Full name", "text", "name", 100],
        ["email", "Email address", "email", "email", 254],
        ["phone", "Phone number", "tel", "tel", 40],
        ["location", "City / location", "text", "address-level2", 160],
        ...(!learner ? [["password", "Create password", "password", "new-password", 128]] : []),
      ].map(([name, label, type, autoComplete, maxLength]) => <div key={name}>
        <label htmlFor={`enrol-${name}`} className="text-sm font-semibold text-[#40323a]">{label}</label>
        <input id={`enrol-${name}`} name={name} type={type} autoComplete={autoComplete} required maxLength={maxLength}
          minLength={name === "password" ? 8 : undefined} defaultValue={name === "name" ? learner?.name : name === "email" ? learner?.email : undefined}
          readOnly={Boolean(learner && name === "email")} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `enrol-error-${name}` : name === "password" ? "password-help" : undefined} className={inputStyle} />
        {name === "password" && <p id="password-help" className="mt-2 text-xs text-[#171717]">Use at least 8 characters. You’ll use this password to sign in to your courses.</p>}
        {errors[name] && <p id={`enrol-error-${name}`} className="mt-2 text-xs text-[#780c24]">{errors[name]}</p>}
      </div>)}
      <label className="flex items-start gap-3 text-xs leading-6 text-[#171717]"><input type="checkbox" name="consent" required className="mt-1.5 size-4 shrink-0 accent-[#780c24]" /><span>I agree that WAARR may use these details to manage my course enrolment and learning access.</span></label>
      {errors.consent && <p className="text-xs text-[#780c24]">{errors.consent}</p>}
      <button type="submit" disabled={busy} className={buttonStyle}>{busy ? "Saving form…" : "Save and continue to payment"}</button>
    </form> : <section aria-labelledby="payment-heading">
      <h2 id="payment-heading" className="text-2xl font-semibold text-[#302830]">Complete your {demoPayment ? "demo payment" : "payment"}</h2>
      <p className="mt-4 text-sm leading-7 text-[#171717]">Your enrolment form is saved. {course.title} stays locked until payment is completed.</p>
      {demoPayment ? <>
        <div className="my-6 rounded-xl border border-[#e3d5db] bg-[#faf3f5] p-5"><p className="text-sm font-semibold text-[#780c24]">Demo checkout · No money charged</p><p className="mt-3 text-sm leading-7 text-[#171717]">This simulates a successful payment and unlocks this course for 30 days in the local demo. No card or bank details are needed.</p></div>
        <button type="button" disabled={busy} onClick={pay} className={buttonStyle}>{busy ? "Completing demo payment…" : "Complete demo payment and unlock course"}</button>
      </> : <p className="mt-6 rounded-xl border border-[#e3d5db] bg-[#fcfaf9] p-5 text-sm leading-7 text-[#171717]">Online payments will be available once course fees and the payment gateway are configured. Your course remains locked until payment is verified.</p>}
    </section>}
    {error && <p role="alert" className="mt-5 rounded-lg bg-[#fff0f2] p-4 text-sm leading-7 text-[#780c24]">{error}</p>}
  </>;
}
