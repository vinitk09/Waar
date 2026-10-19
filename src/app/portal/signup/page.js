import LearnerAccountPage from "@/components/courses/LearnerAccountPage";

export const metadata = { title: "Sign Up | WAARR Learning", description: "Create your WAARR learner account to access your purchased courses and learning progress." };

export default function SignupPage(props) {
  return <LearnerAccountPage {...props} signup />;
}
