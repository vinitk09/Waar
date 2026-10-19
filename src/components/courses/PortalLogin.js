"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PortalLogin({ next = "/portal" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const pending = useRef(false);
  async function signIn(body) {
    if (pending.current) return;
    pending.current = true;
    setError(""); setBusy(true);
    try {
      const response = await fetch("/api/lms/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to sign in.");
      router.replace(next); router.refresh();
    } catch (failure) { setError(failure.message); } finally { pending.current = false; setBusy(false); }
  }
  return <><form onSubmit={event => { event.preventDefault(); const data = new FormData(event.currentTarget); signIn({ email: data.get("email"), password: data.get("password") }); }} className="space-y-5"><div><label htmlFor="learner-email" className="text-sm font-semibold text-[#40323a]">Email address</label><input id="learner-email" name="email" type="email" autoComplete="username" required maxLength={254} className="mt-2 min-h-12 w-full rounded-lg border border-[#e3d5db] px-4 text-sm outline-none focus:border-[#780c24] focus:ring-2 focus:ring-[#780c24]/15" /></div><div><label htmlFor="learner-password" className="text-sm font-semibold text-[#40323a]">Password</label><input id="learner-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required maxLength={256} className="mt-2 min-h-12 w-full rounded-lg border border-[#e3d5db] px-4 text-sm outline-none focus:border-[#780c24] focus:ring-2 focus:ring-[#780c24]/15" /></div>{error && <p role="alert" className="rounded-lg bg-[#fff0f2] p-3 text-sm text-[#780c24]">{error}</p>}<button disabled={busy} type="submit" className="min-h-12 w-full cursor-pointer rounded-lg bg-[#780c24] px-5 py-3 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-60">{busy ? "Signing in…" : "Sign in to learning"}</button></form><div className="mt-4 flex flex-wrap items-center justify-between gap-3"><label className="flex items-center gap-2 text-xs text-[#171717]"><input type="checkbox" checked={showPassword} onChange={event => setShowPassword(event.target.checked)} className="accent-[#780c24]" />Show password</label><Link href="/contact?interest=Other&source=participant-login" className="inline-flex min-h-10 items-center text-xs font-semibold text-[#780c24]">Need account access help?</Link></div><p className="mt-5 border-t border-[#e3d5db] pt-5 text-center text-sm text-[#59454e]">New to WAARR? <Link href={`/portal/signup?next=${encodeURIComponent(next)}`} className="font-semibold text-[#780c24] underline">Sign up</Link></p></>;
}
