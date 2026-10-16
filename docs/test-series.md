# Course test series

Each course has a test-series entry point on its public overview, the learning dashboard and its course workspace. `/portal/learn/{slug}/tests` requires a submitted enrolment form, completed payment and active access for that course. See `course-enrolment.md` for the demo checkout flow.

Learners answer untimed multiple-choice questions and submit all answers for server-side scoring. Each correct answer earns one mark, with no negative marking. Submitted results include explanations, answer review and a private attempt history. Retakes create separate attempts; retrying the same submission reference returns the saved attempt.

The initial question sets are explicitly labelled sample practice. They demonstrate the workflow and do not represent approved exam papers, a full syllabus, official selection criteria or an external credential assessment. Replace or extend them with approved course questions in `src/lib/test-series.js`. Give changed test papers new versioned IDs so saved results retain their original question and answer snapshots. Answer keys stay in server-only code.

Results use the existing local LMS store at `.data/lms.json`. This shares the current LMS deployment limitation: use a single persistent server instance; a shared transactional database is needed for multiple instances or ephemeral hosting. No new staff authoring interface, timed exam mode or ranking system is included.

Verification: `node --test tests/test-series.test.mjs` checks grading, answer validation and the public question payload. `npm run build` checks the application routes.
