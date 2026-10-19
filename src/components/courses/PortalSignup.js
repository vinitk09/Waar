"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PortalSignup({ next = "/portal" }) {
  const router = useRouter();
  const pending = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  async function signup(event) {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true; setBusy(true); setError(""); setErrors({});
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/lms/signup", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(form), consent: form.get("consent") === "on" }) });
      const result = await response.json();
      if (!response.ok) { setErrors(result.errors ?? {}); throw new Error(result.error ?? "Unable to create your account."); }
      router.replace(next); router.refresh();
    } catch (failure) { setError(failure.message); }
    finally { pending.current = false; setBusy(false); }
  }
  return <form onSubmit={signup} className="space-y-5">
    {[["name", "Full name", "name", 100], ["email", "Email address", "email", 254], ["password", "Password", "new-password", 128], ["confirmPassword", "Confirm password", "new-password", 128]].map(([name, label, autoComplete, maxLength]) => <div key={name}>
      <label htmlFor={`signup-${name}`} className="text-sm font-semibold text-[#40323a]">{label}</label>
      <input id={`signup-${name}`} name={name} type={name.toLowerCase().includes("password") ? showPassword ? "text" : "password" : name === "email" ? "email" : "text"}
        autoComplete={autoComplete} required maxLength={maxLength} minLength={autoComplete === "new-password" ? 8 : name === "name" ? 2 : undefined}
        aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `signup-error-${name}` : name === "password" ? "signup-password-help" : undefined}
        className="mt-2 min-h-12 w-full rounded-lg border border-[#e3d5db] px-4 text-sm outline-none focus:border-[#780c24] focus:ring-2 focus:ring-[#780c24]/15" />
      {name === "password" && <p id="signup-password-help" className="mt-2 text-xs text-[#59454e]">Use 8–128 characters.</p>}
      {errors[name] && <p id={`signup-error-${name}`} className="mt-2 text-xs text-[#780c24]">{errors[name]}</p>}
    </div>)}
    <label className="flex items-center gap-2 text-xs text-[#171717]"><input type="checkbox" checked={showPassword} onChange={event => setShowPassword(event.target.checked)} className="accent-[#780c24]" />Show passwords</label>
    <div><label className="flex items-start gap-3 text-xs leading-6 text-[#171717]"><input name="consent" type="checkbox" required aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "signup-error-consent" : undefined} className="mt-1.5 size-4 shrink-0 accent-[#780c24]" /><span>I agree that WAARR may use my details to manage my learner account and course access.</span></label>
      {errors.consent && <p id="signup-error-consent" className="mt-2 text-xs text-[#780c24]">{errors.consent}</p>}</div>
    {error && <p role="alert" className="rounded-lg bg-[#fff0f2] p-3 text-sm text-[#780c24]">{error}</p>}
    <button type="submit" disabled={busy} className="min-h-12 w-full cursor-pointer rounded-lg bg-[#780c24] px-5 py-3 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-60">{busy ? "Creating account…" : "Create my account"}</button>
    <p className="text-center text-sm text-[#59454e]">Already have an account? <Link href={`/portal/login?next=${encodeURIComponent(next)}`} className="font-semibold text-[#780c24] underline">Sign in</Link></p>
  </form>;
}
