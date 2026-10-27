# Defence-focused homepage

The homepage prioritises defence preparation. All nine existing defence programmes are linked, followed by preparation support, official NDA photographs, expandable study tips and a closing founder's message.

## Content to confirm

- Upcoming batches are enquiries for NDA, CDS and SSB. Dates, fees, timings, format and seat availability are deliberately unconfirmed; update `src/data/home-defence.js` and the batch card labels when schedules are supplied.
- The founder's message is proposed editorial copy. No name, biography, military credentials, portrait or selection results have been invented. Replace it with the founder's approved wording when available.

## Faculty profiles

The faculty carousel sits immediately above the founder's message. It uses six existing sample teacher identities from the NDA, CDS and SSB course content, as authorised for preview. Profiles live at `/faculty/[slug]` and include subjects, illustrative teaching approach, related courses and a course enquiry link. Names and subject areas derive from `src/data/course-academics.js`; the profile data is assembled in `src/data/faculty.js`.

Initial avatars stand in for unavailable portraits. Both the carousel and profile pages visibly identify the content as sample material. Replace with approved biographies, portraits, qualifications and experience when available. The carousel supports touch scrolling, keyboard-accessible profile links and previous/next controls; motion follows the visitor's reduced-motion preference.

## NDA photo sources

Downloaded from the official National Defence Academy website on 17 October 2026, from the image paths used in its Five Pillars section:

- `https://nda.nic.in/images/pillars_images/Military.jpg`
- `https://nda.nic.in/images/pillars_images/Academics.JPG`
- `https://nda.nic.in/images/pillars_images/Physical_Training.JPG`
- `https://nda.nic.in/images/pillars_images/Leadership.JPG`

Local copies are in `public/images/nda/` to avoid runtime dependence on the external website. Visible credits link to the source. The photographs depict NDA activities; the page identifies WAARR as an independent preparation provider.
