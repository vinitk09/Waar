# WAARR learning implementation

The course catalogue is `/courses`. Course overviews use the shared Defence records plus CSCS preparation. The participant dashboard is `/portal`; lesson workspaces are `/portal/learn/[slug]`.

## Local demonstration

Start `npm run dev`, open `/portal/login`, and choose either demonstration learner. The Defence learner has NDA and SSB enrolments; the Education learner has CSCS only. Demo entry is disabled outside development. The lesson text, worksheets and timetable are labelled samples. No actual videos, fees, class links, batch dates, certifications or faculty identities are invented.

Sessions use an opaque random token in an HTTP-only cookie. The server stores only the token hash, expiry and user identity. Cookie security is enabled in production. Writes require matching Origin. Course pages, progress writes and resource downloads check active enrolment and access expiry on the server. Progress survives navigation and logout in the local file store.

Local data is private server-side JSON in `.data/lms.json`. It is a single-instance development store, not the deployment database. Demo profiles are shared sample identities, not individual student accounts. Do not place real learner information in this demonstration store.

## Remaining operational integration

Before use with real participants: select and configure the persistent database and identity provider; implement enrolment activation invitations, password recovery and staff account/batch management; load approved lessons, recorded videos, faculty details and resource versions; configure real batch schedules and authorised meeting links; define storage, access periods and policies. Implement shared, production-grade rate limits and transactional database writes. The current email/password path does not self-register users or assign enrolments.

The private course player is a working demonstration of protected access and completion, not completion of the brief's whole LMS release checklist. Live joining, recording expiry, staff content operations and participant invitations require the above integration. The Contact page now saves validated development enquiries privately under `.data/enquiries`, with an idempotent receipt and a routing queue. It does not send email. Production submission is unavailable until delivery and production storage are configured. Login includes account-access help through Contact; automated password recovery and activation invitations remain pending.
