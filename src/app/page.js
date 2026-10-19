import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import DefenceHome from "@/components/home/DefenceHome";

export const metadata = {
  title: "WAARR | NDA, CDS, AFCAT & SSB Defence Preparation",
  description: "Explore WAARR defence preparation courses, upcoming batch enquiries, SSB practice and physical readiness programmes.",
};

export default function Home() {
  return <><Header /><main className="font-sans"><Hero /><DefenceHome /></main><Footer /></>;
}
