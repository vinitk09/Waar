import EnquiryForm from "@/components/contact/EnquiryForm";

export default function HomeEnquiry() {
  return (
    <section
      id="enquiry"
      aria-labelledby="home-enquiry-heading"
      className="scroll-mt-32 border-t border-[#e9e1e4] bg-[#faf7f5]"
    >
      <div className="mx-auto grid max-w-[1480px] gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-12 lg:py-24">
        <div>
          <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-[#780c24] uppercase">
            <span aria-hidden="true" className="h-0.5 w-6 bg-[#780c24]" />
            Enquire with WAARR
          </p>
          <h2
            id="home-enquiry-heading"
            className="text-3xl leading-[1.15] font-semibold tracking-[-0.035em] text-[#232025] sm:text-4xl lg:text-[44px]"
          >
            Your next step starts<br />
            <span className="text-[#780c24]">with a conversation.</span>
          </h2>
          <p className="mt-5 max-w-[470px] text-sm leading-7 text-[#70616a]">
            Have a question about NDA, CDS, AFCAT or SSB preparation? Share
            your details and goals so our team can help you explore courses,
            upcoming batches and enrolment steps.
          </p>
          <div className="mt-8 rounded-2xl bg-[#291e24] p-6 text-white sm:p-8">
            <h3 className="text-lg font-semibold">Let us help you plan.</h3>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-[#d0c3ca]">
              {[
                "Find a programme that fits your preparation goals.",
                "Ask about batch schedules, fees and availability.",
                "Understand the next steps before enrolling.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#e0a8b9]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="min-w-0 rounded-2xl border border-[#e3d5db] bg-white p-6 sm:p-8">
          <h3 className="text-2xl font-semibold tracking-tight text-[#302830]">
            Enquiry form
          </h3>
          <p className="mt-2 mb-7 text-xs leading-6 text-[#70616a]">
            Tell us what you are looking for. Fields marked optional may be left blank.
          </p>
          <EnquiryForm
            context={{
              interest: "Defence Preparation",
              programme: "",
              audience: "individual",
              source: "home-enquiry",
            }}
            local={process.env.NODE_ENV === "development"}
          />
        </div>
      </div>
    </section>
  );
}
