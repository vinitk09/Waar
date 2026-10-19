import test from "node:test";
import assert from "node:assert/strict";
import { breadcrumbsForPath } from "../src/lib/breadcrumbs.js";

const catalog = {
  courses: [{ slug: "nda", title: "NDA Preparation" }],
  projects: [{ slug: "sample", name: "Sample Project" }],
  faculty: [{ slug: "sample-teacher", name: "Sample Teacher" }],
};
const trail = path => breadcrumbsForPath(path, catalog);

test("breadcrumbs cover main pages and omit the home and unknown routes", () => {
  for (const path of ["/about", "/contact", "/sports", "/courses", "/defence", "/projects", "/results", "/sitemap", "/solutions", "/portal", "/portal/login", "/portal/signup"]) {
    const items = trail(path);
    assert.equal(items[0].href, "/");
    assert.equal(items.at(-1).href, path);
    assert.equal(items.length, 2);
  }
  for (const path of ["/", null, "/not-a-page", "/courses/missing", "/courses/nda/unknown", "/portal/learn/nda/unknown"]) assert.deepEqual(trail(path), []);
});

test("nested course and learning routes use real parent destinations", () => {
  assert.deepEqual(trail("/courses/nda/enrol").map(item => item.label), ["Home", "Courses", "NDA Preparation", "Enrolment"]);
  assert.deepEqual(trail("/portal/learn/nda/tests").map(item => item.href), ["/", "/portal", "/portal/learn/nda", "/portal/learn/nda/tests"]);
  assert.deepEqual(trail("/defence/programmes/nda").map(item => item.href), ["/", "/defence", "/defence/programmes/nda"]);
  assert.equal(trail("/courses/nda/").at(-1).label, "NDA Preparation");
  assert.equal(trail("/courses/nda?lesson=welcome").at(-1).href, "/courses/nda");
});

test("project, faculty and solution trails avoid nonexistent index pages", () => {
  assert.equal(trail("/projects/sample").at(-1).label, "Sample Project");
  assert.deepEqual(trail("/faculty/sample-teacher").map(item => item.href), ["/", "/#faculty", "/faculty/sample-teacher"]);
  for (const path of ["/solutions/education", "/solutions/workforce", "/solutions/performance-intelligence"]) assert.equal(trail(path)[1].href, "/solutions");
});
