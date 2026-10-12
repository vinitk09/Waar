"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { courses } from "@/data/courses";
import { enquiryInterests, defenceInterests } from "@/data/enquiries";

const inputStyle =
  "mt-2 min-h-12 w-full rounded-lg border border-[#e3d5db] bg-white px-4 text-sm text-[#40323a] outline-none focus:border-[#780c24] focus:ring-2 focus:ring-[#780c24]/15 aria-invalid:border-[#780c24]";

function EnquiryField({
  errors,
  name,
  label,
  type = "text",
  required = true,
  maxLength = 160,
  autoComplete,
}) {
  return (
    <div>
      <label
        htmlFor={`enquiry-${name}`}
        className="text-xs font-semibold text-[#40323a]"
      >
        {label}
        {!required && (
          <span className="ml-1 font-normal text-[#171717]">(optional)</span>
        )}
      </label>
      <input
        id={`enquiry-${name}`}
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `error-${name}` : undefined}
        className={inputStyle}
      />
      {errors[name] && (
        <p id={`error-${name}`} className="mt-2 text-xs text-[#780c24]">
          {errors[name]}
        </p>
      )}
    </div>
  );
}

export default function EnquiryForm({ context, local }) {
  const [interest, setInterest] = useState(context.interest);
  const [programme, setProgramme] = useState(context.programme);
  const [audience, setAudience] = useState(context.audience);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const requestId = useRef(null);
  const requestPending = useRef(false);
  const programmeOptions = defenceInterests.includes(interest)
    ? courses.filter((course) => course.category === "Defence")
    : interest === "Coach Education"
      ? courses.filter((course) => course.category === "Professional Education")
      : [];
  async function submit(event) {
    event.preventDefault();
    if (requestPending.current) return;
    const data = new FormData(event.currentTarget);
    requestPending.current = true;
    setBusy(true);
    setErrors({});
    setMessage("");
    requestId.current ??= crypto.randomUUID();
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(data),
          interest,
          programme: programmeOptions.length ? programme : "",
          audience,
          source: context.source,
          consent: data.get("consent") === "on",
          requestId: requestId.current,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        setErrors(result.errors ?? {});
        throw new Error(
          result.error ?? "Unable to save your enquiry. Please try again.",
        );
      }
      setReference(result.reference);
    } catch (error) {
      setMessage(error.message);
    } finally {
      requestPending.current = false;
      setBusy(false);
    }
  }

  if (reference)
    return (
      <div
        role="status"
        className="rounded-2xl border border-[#e3d5db] bg-[#fcfaf9] p-6 sm:p-8"
      >
        <p className="text-[10px] font-semibold tracking-[0.14em] text-[#780c24] uppercase">
          Enquiry saved
        </p>
        <h2 className="mt-4 text-2xl font-semibold text-[#302830]">
          Thank you for sharing your requirement.
        </h2>
        <p className="mt-4 text-sm leading-7 text-[#171717]">
          Your reference is{" "}
          <strong className="text-[#780c24]">{reference}</strong>.
        </p>
        <p className="mt-3 text-sm leading-7 text-[#171717]">
          This enquiry is not admission, payment or a confirmed appointment.
        </p>
        {local && (
          <p className="mt-4 text-xs leading-6 text-[#171717]">
            Development mode: the enquiry is saved privately on this website’s
            local server. It has not been emailed to the WAARR team.
          </p>
        )}
        <Link
          href="/courses"
          className="mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-[#780c24]"
        >
          Explore courses<span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="enquiry-interest"
            className="text-xs font-semibold text-[#40323a]"
          >
            I am interested in
          </label>
          <select
            id="enquiry-interest"
            name="interest"
            value={interest}
            onChange={(event) => {
              setInterest(event.target.value);
              setProgramme("");
            }}
            className={inputStyle}
          >
            {enquiryInterests.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="enquiry-audience"
            className="text-xs font-semibold text-[#40323a]"
          >
            I am enquiring for
          </label>
          <select
            id="enquiry-audience"
            name="audience"
            value={audience}
            onChange={(event) => setAudience(event.target.value)}
            className={inputStyle}
          >
            <option value="individual">Myself / an individual</option>
            <option value="aspirant">A defence aspirant</option>
            <option value="serving-personnel">Serving personnel</option>
            <option value="organisation">An organisation</option>
          </select>
        </div>
      </div>
      {programmeOptions.length > 0 && (
        <div>
          <label
            htmlFor="enquiry-programme"
            className="text-xs font-semibold text-[#40323a]"
          >
            Programme (optional)
          </label>
          <select
            id="enquiry-programme"
            name="programme"
            value={programme}
            onChange={(event) => setProgramme(event.target.value)}
            className={inputStyle}
          >
            <option value="">Help me choose a programme</option>
            {programmeOptions.map((course) => (
              <option key={course.slug} value={course.title}>
                {course.title}
              </option>
            ))}
          </select>
          {errors.programme && (
            <p className="mt-2 text-xs text-[#780c24]">{errors.programme}</p>
          )}
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <EnquiryField
          errors={errors}
          name="name"
          label="Name"
          maxLength={100}
          autoComplete="name"
        />
        <EnquiryField
          errors={errors}
          name="organisation"
          label="Organisation"
          required={false}
          autoComplete="organization"
        />
        <EnquiryField
          errors={errors}
          name="phone"
          label="Phone"
          type="tel"
          maxLength={40}
          autoComplete="tel"
        />
        <EnquiryField
          errors={errors}
          name="email"
          label="Email"
          type="email"
          maxLength={254}
          autoComplete="email"
        />
      </div>
      <EnquiryField
        errors={errors}
        name="location"
        label="Location"
        autoComplete="address-level2"
      />
      <div>
        <label
          htmlFor="enquiry-requirement"
          className="text-xs font-semibold text-[#40323a]"
        >
          Tell us about your requirement
        </label>
        <textarea
          id="enquiry-requirement"
          name="requirement"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          aria-invalid={Boolean(errors.requirement)}
          className={`${inputStyle} py-3`}
        />
        {errors.requirement && (
          <p className="mt-2 text-xs text-[#780c24]">{errors.requirement}</p>
        )}
      </div>
      <div aria-hidden="true" className="hidden">
        <label htmlFor="enquiry-website">Leave this field empty</label>
        <input
          id="enquiry-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <label className="flex items-start gap-3 text-xs leading-6 text-[#171717]">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-1.5 size-4 shrink-0 accent-[#780c24]"
        />
        <span>
          I agree that WAARR may use my contact details and requirement to
          respond to this enquiry. Please do not include sensitive medical
          records or identity documents here.
        </span>
      </label>
      {errors.consent && (
        <p className="text-xs text-[#780c24]">{errors.consent}</p>
      )}
      {message && (
        <p
          role="alert"
          className="rounded-lg bg-[#fff0f2] p-3 text-sm text-[#780c24]"
        >
          {message} Your entries are kept so you can correct them and try again.
        </p>
      )}
      <button
        disabled={busy}
        type="submit"
        className="min-h-12 cursor-pointer rounded-lg bg-[#780c24] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5d091b] disabled:cursor-wait disabled:opacity-60"
      >
        {busy ? "Saving enquiry…" : "Submit enquiry"}
      </button>
      <p className="text-xs leading-6 text-[#171717]">
        Submission begins an enquiry. The team must separately confirm programme
        availability, admission or appointment arrangements.
      </p>
      {local && (
        <p className="text-xs leading-6 text-[#171717]">
          Local development: submissions are stored privately on this server.
          Email delivery is not connected.
        </p>
      )}
    </form>
  );
}
