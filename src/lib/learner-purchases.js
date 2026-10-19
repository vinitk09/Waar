import { hasCourseAccess } from "./course-access.js";

// History is separate from permission to open a course, and only contains this learner's records.
export function learnerPurchases(store, userId, now, allowDemo) {
  return (store.registrations ?? []).filter(item => item.userId === userId && item.status === "submitted").map(registration => {
    const payment = [...(store.payments ?? [])].reverse().find(item => item.userId === userId && item.registrationId === registration.id && item.courseId === registration.courseId &&
      ((item.mode === "live" && item.status === "verified") || (item.mode === "demo" && item.status === "completed")));
    const enrolments = (store.enrolments ?? []).filter(item => item.userId === userId && item.registrationId === registration.id && item.courseId === registration.courseId && item.paymentId === payment?.id);
    const active = enrolments.find(item => hasCourseAccess(item, userId, [registration], payment ? [payment] : [], now, allowDemo));
    const expired = enrolments.some(item => Number.isFinite(item.accessEnd) && item.accessEnd <= now);
    return { id: registration.id, courseId: registration.courseId, submittedAt: registration.submittedAt,
      payment: payment ? { id: payment.id, mode: payment.mode, paidAt: payment.paidAt } : null,
      status: active ? "active" : !payment ? "pending" : payment.mode === "demo" && !allowDemo ? "demo" : expired ? "expired" : "unavailable" };
  }).reverse();
}
