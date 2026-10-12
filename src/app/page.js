import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import WhatIsWaarr from "@/components/home/WhatIsWaarr";
import CoreVerticals from "@/components/home/CoreVerticals";
import WhatWeDo from "@/components/home/WhatWeDo";
import OurSolutions from "@/components/home/OurSolutions";
import WhoWeWorkWith from "@/components/home/WhoWeWorkWith";
import Projects from "@/components/home/Projects";
import WhyWaarr from "@/components/home/WhyWaarr";
import FinalCallToAction from "@/components/home/FinalCallToAction";

export default function Home() {
  return <><Header /><main><Hero /><WhatIsWaarr /><CoreVerticals /><WhatWeDo /><OurSolutions /><WhoWeWorkWith /><Projects /><WhyWaarr /><FinalCallToAction /></main><Footer /></>;
}
