export function hasCourseAccess(enrolment, userId, registrations, payments, now, allowDemo) {
  if (enrolment.userId !== userId || enrolment.status !== "active" ||
      !Number.isFinite(enrolment.start) || enrolment.start > now ||
      !Number.isFinite(enrolment.accessEnd) || enrolment.accessEnd <= now) return false;
  const registration = registrations.find(item => item.id === enrolment.registrationId &&
    item.userId === userId && item.courseId === enrolment.courseId && item.status === "submitted");
  if (!registration) return false;
  return payments.some(item => item.id === enrolment.paymentId && item.registrationId === registration.id &&
    item.userId === userId && item.courseId === enrolment.courseId &&
    ((item.mode === "demo" && item.status === "completed" && allowDemo) ||
      (item.mode === "live" && item.status === "verified")));
}

export function learningDestination(value) {
  return typeof value === "string" && (/^\/courses\/[a-z0-9-]+\/enrol$/.test(value) ||
    /^\/portal(?:\/learn\/[a-z0-9-]+(?:\/tests)?)?$/.test(value)) ? value : "/portal";
}
