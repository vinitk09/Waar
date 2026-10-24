import AcademyCard from "./AcademyCard";
import { academies } from "@/data/home-defence";

export default function AcademyGallery() {
  return (
    <section id="academy-gallery" aria-labelledby="academy-heading" className="bg-[#faf7f5]">
      <div className="mx-auto max-w-[1480px] px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-[#780c24] uppercase">
              <span aria-hidden="true" className="h-0.5 w-6 bg-[#780c24]" />
              The ambition that inspires us
            </p>
            <h2 id="academy-heading" className="text-3xl leading-[1.15] font-semibold tracking-[-0.035em] text-[#232025] sm:text-4xl lg:whitespace-nowrap lg:text-[44px]">
              A glimpse of your{" "}
              <span className="text-[#780c24]">aspiration.</span>
            </h2>
          </div>
          <p className="max-w-[440px] text-sm leading-7 text-[#70616a]">
            The parade grounds, the pride, the purpose. Explore the academies
            that inspire a journey of discipline, leadership and service.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
          {academies.map((academy, index) => (
            <AcademyCard key={academy.slug} academy={academy} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
