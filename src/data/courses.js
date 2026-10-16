import { defenceProgrammes } from "./defence-programmes";
import { courseAcademics } from "./course-academics";

export const courses = [
  ...defenceProgrammes.map(programme => ({
    ...programme,
    category: "Defence",
    image: programme.slug === "communication-soft-skills" ? "/images/defence-learning-hero.png" : "/images/army-preparation-hero-v3.png",
    availability: "Confirm upcoming batch",
  })),
  {
    slug: "cscs-preparation", title: "CSCS Preparation", short: "CSCS", category: "Professional Education",
    ...courseAcademics["cscs-preparation"],
    description: "Explore preparation for the external CSCS credential. Confirm the teaching scope and current availability with the WAARR team.",
    audience: "Coaches and aspiring strength and conditioning practitioners seeking credential preparation.",
    focus: ["Strength & conditioning preparation", "Professional study planning", "Applied performance learning"],
    interest: "Coach Education", image: "/images/sports-gym.png", availability: "Confirm upcoming batch",
  },
];

export const learningJourney = [
  { name: "Explore course details", detail: "Review the course overview and learning focus. Lessons, resources and tests stay locked." },
  { name: "Enrol and complete payment", detail: "Fill in the course enrolment form and complete payment to unlock that course in your learner account." },
  { name: "Follow your timetable", detail: "Use your assigned class schedule, session topics and learning resources." },
  { name: "Practise and review", detail: "Take your course test series, review answer explanations and track your saved results in the learning portal." },
];

export function courseEnquiry(course) {
  return `/contact?interest=${encodeURIComponent(course.interest)}&programme=${encodeURIComponent(course.title)}&source=courses`;
}
