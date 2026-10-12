export const enquiryInterests = ["Sports Infrastructure", "High-Performance Centre", "Athlete Performance", "Sports Assessment", "Defence Preparation", "NDA / CDS / SSB", "Defence Performance", "Workforce Deployment", "Coach Education", "Performance Consulting", "Other"];
export const defenceInterests = ["Defence Preparation", "NDA / CDS / SSB", "Defence Performance"];

export function normaliseInterest(value) {
  if (value === "Sports") return "Sports Infrastructure";
  if (value === "Defence") return "Defence Preparation";
  return enquiryInterests.includes(value) ? value : "Other";
}

export function enquiryQueue(interest, audience) {
  if (audience === "organisation" || ["Workforce Deployment", "High-Performance Centre", "Sports Infrastructure"].includes(interest)) return "institutional";
  if (defenceInterests.includes(interest)) return "defence";
  if (interest === "Coach Education") return "education";
  if (["Athlete Performance", "Sports Assessment", "Performance Consulting"].includes(interest)) return "sports";
  return "general";
}
