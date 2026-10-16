import "server-only";
import { courses } from "@/data/courses";
import { publicTest } from "@/lib/test-grading";

// Sample questions only. Add approved, versioned course tests here before launch.
const question = (id, prompt, options, correct, explanation) => ({ id, prompt, options, correct, explanation });
const mathematics = [
  question("percentage", "What is 15% of 240?", ["24", "30", "36", "48"], 2, "240 × 15 ÷ 100 = 36."),
  question("equation", "If 3x + 7 = 22, what is x?", ["3", "5", "7", "9"], 1, "Subtract 7, then divide by 3: x = 15 ÷ 3 = 5."),
  question("average", "What is the arithmetic mean of 8, 12 and 16?", ["10", "12", "14", "16"], 1, "The sum is 36. Divide by the three values to get 12."),
];
const english = [
  question("agreement", "Choose the correct sentence.", ["She have a plan.", "She has a plan.", "She having a plan."], 1, "The singular subject ‘she’ takes ‘has’."),
  question("synonym", "Which word is closest in meaning to ‘concise’?", ["Brief", "Uncertain", "Complicated"], 0, "Concise communication is brief and clearly expressed."),
  question("sequence", "Which number comes next: 3, 6, 12, 24, …?", ["30", "36", "48"], 2, "Each number is twice the previous number."),
];
const communication = [
  question("listening", "Which response best demonstrates active listening?", ["Interrupt with your own story", "Summarise the speaker’s point and check your understanding", "Prepare your reply while ignoring the speaker"], 1, "Summarising and checking understanding helps confirm the intended message."),
  question("clarity", "When an instruction is unclear, what is the most useful next step?", ["Ask a focused clarification question", "Assume the missing details", "Ignore the instruction"], 0, "A focused question resolves uncertainty before you act."),
  question("feedback", "Which feedback is most actionable?", ["Do better", "Everything is wrong", "State your main point first, then give one supporting example"], 2, "Specific feedback identifies a change the learner can practise."),
];
const preparation = [
  question("reflection", "Which reflection is most useful after a practice group activity?", ["Only whether you spoke the most", "A specific example of how you contributed and what you could improve", "A memorised description of perfect behaviour"], 1, "Specific reflection supports learning from your own actions."),
  question("teamwork", "A group is overlooking a quieter member’s useful idea. What supports collaboration?", ["Invite them to explain the idea", "Talk over them", "Dismiss the idea without discussion"], 0, "Inviting contributions helps the group consider relevant ideas."),
  question("practice", "What is the purpose of a coaching mock assessment?", ["Guarantee selection", "Replace official selection", "Provide preparation practice and feedback"], 2, "Coaching simulations support preparation; they do not replace official selection or guarantee outcomes."),
];
const guidance = [
  question("eligibility", "Where should you verify eligibility for a particular entry route?", ["An undated social-media post", "The current applicable official notification", "A friend’s recollection"], 1, "Use the current official notification for the applicable entry route."),
  question("planning", "What should a useful preparation plan include?", ["Only a distant target date", "The same activities regardless of your needs", "Specific actions and regular review points"], 2, "Actions and review points make it possible to assess progress and adjust preparation."),
  question("documents", "What is the best approach to entry-route documentation?", ["Check the official requirements and deadlines in advance", "Assume every route uses the same requirements", "Wait until after the deadline"], 0, "Check the requirements for your specific route before the stated deadlines."),
];
const coaching = [
  question("overload", "What does progressive overload involve?", ["Gradually adjusting training demand as appropriate", "Always training to exhaustion", "Avoiding all recovery"], 0, "Progressive overload adjusts the training stimulus over time in line with capacity and goals."),
  question("specificity", "Which principle says training adaptations relate to the demands of training?", ["Randomisation", "Specificity", "Inactivity"], 1, "Specificity links adaptations to the type and demands of the training performed."),
  question("recovery", "Why include recovery in a training programme?", ["It replaces all training", "It guarantees a particular result", "It supports adaptation and readiness for further training"], 2, "Recovery helps manage training stress and supports adaptation."),
];

export function courseTests(courseId) {
  const course = courses.find(item => item.slug === courseId);
  if (!course) return [];
  let questions = guidance;
  if (["nda", "acc"].includes(courseId)) questions = mathematics;
  if (["cds", "afcat"].includes(courseId)) questions = english;
  if (["ssb", "ssb-mock-assessments"].includes(courseId)) questions = preparation;
  if (courseId === "communication-soft-skills") questions = communication;
  if (courseId === "cscs-preparation") questions = coaching;
  return [{ id: `${courseId}-sample-v1`, title: `${course.short} sample practice`, sample: true, questions }];
}

export function publicCourseTests(courseId) {
  return courseTests(courseId).map(publicTest);
}
