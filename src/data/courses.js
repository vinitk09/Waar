import { defenceProgrammes } from "./defence-programmes";

export const courses = [
  ...defenceProgrammes.map(programme => ({
    ...programme,
    category: "Defence",
    image: programme.slug === "communication-soft-skills" ? "/images/defence-learning-hero.png" : "/images/army-preparation-hero-v3.png",
    availability: "Confirm upcoming batch",
  })),
  {
    slug: "cscs-preparation", title: "CSCS Preparation", short: "CSCS", category: "Professional Education",
    description: "Explore preparation for the external CSCS credential. Confirm the teaching scope and current availability with the WAARR team.",
    audience: "Coaches and aspiring strength and conditioning practitioners seeking credential preparation.",
    focus: ["Strength & conditioning preparation", "Professional study planning", "Applied performance learning"],
    interest: "Coach Education", image: "/images/sports-gym.png", availability: "Confirm upcoming batch",
  },
];

export const learningJourney = [
  { name: "Discuss your goals", detail: "Review the course fit, delivery mode and upcoming batch with the team." },
  { name: "Confirm enrolment", detail: "Confirm admission, programme terms and your assigned batch before learning access is activated." },
  { name: "Follow your timetable", detail: "Use your assigned class schedule, session topics and learning resources." },
  { name: "Practise and review", detail: "Follow the preparation activities and feedback included in your course." },
];

export function courseEnquiry(course) {
  return `/contact?interest=${encodeURIComponent(course.interest)}&programme=${encodeURIComponent(course.title)}&source=courses`;
}
