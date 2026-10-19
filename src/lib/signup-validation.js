export function validateSignup(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { error: "Check your account details." };
  const errors = {};
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  if (name.length < 2 || name.length > 100) errors.name = "Enter your full name (2–100 characters).";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
  if (typeof input.password !== "string" || input.password.length < 8 || input.password.length > 128) errors.password = "Use a password of 8–128 characters.";
  if (input.confirmPassword !== input.password) errors.confirmPassword = "Your passwords do not match.";
  if (input.consent !== true) errors.consent = "Agree to use of your details for your learner account.";
  if (Object.keys(errors).length) return { error: "Please check the highlighted fields.", errors };
  return { fields: { name, email, password: input.password } };
}
