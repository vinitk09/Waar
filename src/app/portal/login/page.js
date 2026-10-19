import LearnerAccountPage from "@/components/courses/LearnerAccountPage";

export const metadata = { title: "Participant Login | WAARR Learning", description: "Access your purchases, enrolled learning, timetable and course resources." };

export default function LoginPage(props) {
  return <LearnerAccountPage {...props} />;
}
