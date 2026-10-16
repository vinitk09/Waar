# Locked courses and enrolment

Public visitors can read course details and test-series descriptions. Lessons, downloads, timetables, test questions, results and progress require course access. Catalogue cards and course overviews show the learner’s current locked or unlocked status.

The flow is **Course details → Enrolment form → Demo payment → Unlocked course**. New learners supply name, email, phone, location, a password and consent. Existing learners sign in with their account before completing the course form. Passwords are salted and hashed; they are not saved in form records. The form creates a pending registration, not learning access. Returning to the enrolment page resumes the pending payment step.

In local development, the explicitly labelled demo payment button records a simulated payment and activates that course for 30 days. It charges no money and collects no card or bank details. Repeated payment submissions reuse the same payment and enrolment. Other courses stay locked.

Demo payments and previously saved demo-account sessions cannot unlock production courses. The old one-click demo-login bypass has been removed. Every protected page and API requires matching records for a submitted registration, completed payment, and an active unexpired enrolment. Old enrolments without these records remain locked; existing records are preserved.

Live payment collection is not connected. Course fees, a gateway account and credentials, and verified payment confirmation are still required. In production the form can be saved, but checkout remains unavailable and access stays locked. Never trust a browser-supplied paid flag or payment reference as proof of payment. Connect successful provider verification to live payment records before accepting live payments.

The current LMS saves users, registrations, demo payments and enrolments in `.data/lms.json`; deploy on a single persistent server until the store is replaced by a shared transactional database. Configure email verification and account recovery before opening live self-registration.

Run `node --test tests/*.test.mjs` for access, form validation, redirect safety and test-scoring checks. Test the demo journey with `npm run dev`; `npm run build` checks the production routes.
