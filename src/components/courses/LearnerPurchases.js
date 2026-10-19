import Link from "next/link";

const date = value => value && Number.isFinite(new Date(value).getTime()) ? new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" }).format(new Date(value)) : "Not recorded";
const statuses = { active: "Course access active", pending: "Awaiting payment", expired: "Course access ended", demo: "Demo access unavailable", unavailable: "Course access unavailable" };

export default function LearnerPurchases({ purchases }) {
  return <section aria-labelledby="purchases-heading">
    <h2 id="purchases-heading" className="text-xl font-semibold text-[#302830]">My purchases & enrolments</h2>
    <p className="mt-3 text-sm leading-7 text-[#59454e]">Your purchased courses and enrolments awaiting payment appear here. Dates are shown in IST.</p>
    {purchases.length ? <div className="mt-5 space-y-4">{purchases.map(item => <article key={item.id} className="flex flex-col gap-5 rounded-xl border border-[#e9e1e4] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0"><h3 className="text-lg font-semibold text-[#302830]">{item.title}</h3>
        <p className="mt-2 text-xs text-[#59454e]">{item.payment ? `${item.payment.mode === "demo" ? "Demo payment completed · No money charged" : "Payment verified"} · ${date(item.payment.paidAt)}` : `Enrolment submitted · ${date(item.submittedAt)}`}</p>
        <p className="mt-3 text-sm font-semibold text-[#780c24]">{statuses[item.status]}</p>
        {item.payment && <p className="mt-2 break-all text-xs text-[#59454e]">Payment reference: {item.payment.id}</p>}
      </div>
      <Link href={item.status === "active" ? `/portal/learn/${item.courseId}` : item.status === "pending" ? `/courses/${item.courseId}/enrol` : "/contact?interest=Other&source=my-purchases"} className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg border border-[#780c24] px-4 text-xs font-semibold text-[#780c24]">{item.status === "active" ? "Open course" : item.status === "pending" ? "Continue enrolment" : "Contact for access"}</Link>
    </article>)}</div> : <div className="mt-5 rounded-xl border border-[#e3d5db] bg-white p-6"><p className="text-sm leading-7 text-[#171717]">You haven’t purchased any courses yet. Explore our courses to start your preparation.</p><Link href="/courses" className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-[#780c24] px-5 text-sm font-semibold text-white">Browse courses</Link></div>}
  </section>;
}
