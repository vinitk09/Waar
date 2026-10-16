export function validateEnrolment(input, signedIn) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { error: "Check your enrolment details." };
  const fields = {};
  const errors = {};
  for (const [key, limit] of Object.entries({ courseId: 100, name: 100, email: 254, phone: 40, location: 160 })) {
    if (typeof input[key] !== "string" || input[key].length > limit) errors[key] = "Check this field.";
    else fields[key] = input[key].trim();
  }
  if ((fields.name?.length ?? 0) < 2) errors.name = "Enter your full name.";
  fields.email = fields.email?.toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email ?? "")) errors.email = "Enter a valid email address.";
  if (!/^[+()\d\s.-]{7,40}$/.test(fields.phone ?? "") || (fields.phone?.replace(/\D/g, "").length ?? 0) < 7) errors.phone = "Enter a valid phone number.";
  if (!fields.location) errors.location = "Enter your city or location.";
  if (!signedIn && (typeof input.password !== "string" || input.password.length < 8 || input.password.length > 128)) errors.password = "Use a password of 8–128 characters.";
  if (input.consent !== true) errors.consent = "Agree to use of your details for course enrolment.";
  if (Object.keys(errors).length) return { error: "Please check the highlighted fields.", errors };
  return { fields: { ...fields, password: signedIn ? undefined : input.password, consent: true } };
}
