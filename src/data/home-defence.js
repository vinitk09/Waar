// Batch dates and availability must be confirmed before replacing these labels.
export const upcomingBatches = [
  { slug: "nda", title: "NDA Preparation", label: "School-level aspirants", description: "Build your mathematics and general ability preparation with a structured study plan and regular practice." },
  { slug: "cds", title: "CDS Preparation", label: "Graduate aspirants", description: "Focus your written-exam preparation with subject revision, practice questions and progress reviews." },
  { slug: "ssb", title: "SSB Preparation", label: "Interview preparation", description: "Prepare for psychological tasks, group activities and personal interviews through guided practice." },
];

export const academies = [
  { slug: "nda", short: "NDA", name: "National Defence Academy", label: "One ambition. Three services.", paradeAlt: "NDA cadets in white ceremonial uniforms on parade", campusAlt: "National Defence Academy building and landscaped grounds", position: "center 35%" },
  { slug: "ima", short: "IMA", name: "Indian Military Academy", label: "The resolve to lead.", paradeAlt: "Cadets marching past the Indian Military Academy building", campusAlt: "Red and white Indian Military Academy building with its clock tower", position: "center 55%" },
  { slug: "ina", short: "INA", name: "Indian Naval Academy", label: "A calling beyond the horizon.", paradeAlt: "Naval cadets in white uniforms marching in formation", campusAlt: "Indian Naval Academy campus with the Indian flag", position: "center 60%" },
  { slug: "afa", short: "AFA", name: "Air Force Academy", label: "Set your sights higher.", paradeAlt: "Air Force cadets on parade beneath a displayed fighter aircraft", campusAlt: "Air Force Academy parade ground during an aircraft flypast", position: "center 55%" },
];

export const preparationGuides = [
  { tag: "NDA PREPARATION", title: "Build a focused NDA study routine", description: "Turn a broad syllabus into a practical weekly plan for mathematics, general ability and revision.", steps: ["Start with a practice paper to identify the topics that need the most attention.", "Set aside regular blocks for mathematics and general ability, and keep a short daily revision slot.", "Review mistakes after each timed practice session and use them to plan your next week."], slug: "nda" },
  { tag: "SSB INTERVIEW", title: "Prepare for the person behind the interview", description: "Develop self-awareness, clear communication and a consistent approach to group practice.", steps: ["Reflect on your responsibilities, interests, decisions and experiences so you can discuss them honestly.", "Practise listening and contributing to discussions without relying on memorised answers.", "Seek feedback from mock activities and choose one concrete improvement for your next attempt."], slug: "ssb" },
  { tag: "CDS PREPARATION", title: "Make your CDS practice count", description: "Bring subject revision, timed questions and an error log into one manageable preparation cycle.", steps: ["Review the papers relevant to your intended entry and assess your starting point.", "Balance subject study with timed practice rather than leaving practice until the end.", "Keep an error log and revisit difficult concepts before taking another mock test."], slug: "cds" },
];
