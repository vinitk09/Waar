const pages = {
  "/about": "About", "/contact": "Contact", "/sports": "Sports",
  "/courses": "Courses", "/defence": "Defence", "/projects": "Projects",
  "/results": "Results & selections", "/sitemap": "Sitemap", "/solutions": "Solutions",
  "/solutions/workforce": "Workforce", "/solutions/education": "Education",
  "/solutions/performance-intelligence": "Performance Intelligence",
  "/portal": "My learning", "/portal/login": "Login", "/portal/signup": "Sign up",
};

export function breadcrumbsForPath(pathname, { courses = [], projects = [], faculty = [] } = {}) {
  if (!pathname || pathname === "/") return [];
  const path = pathname.split(/[?#]/)[0].replace(/\/+$/, "");
  const home = { label: "Home", href: "/" };
  const courseRoot = { label: "Courses", href: "/courses" };
  const learningRoot = { label: "My learning", href: "/portal" };
  const parts = path.split("/").filter(Boolean);
  const title = slug => courses.find(item => item.slug === slug)?.title;
  if (parts[0] === "courses" && parts[1]) {
    const label = title(parts[1]);
    if (!label || (parts.length > 2 && (parts[2] !== "enrol" || parts.length !== 3))) return [];
    return [home, courseRoot, { label, href: `/courses/${parts[1]}` }, ...(parts[2] === "enrol" ? [{ label: "Enrolment", href: path }] : [])];
  }
  if (parts[0] === "defence" && parts[1] === "programmes" && parts.length === 3) {
    const label = title(parts[2]);
    return label ? [home, { label: "Defence", href: "/defence" }, { label, href: path }] : [];
  }
  if (parts[0] === "projects" && parts.length === 2) {
    const label = projects.find(item => item.slug === parts[1])?.name;
    return label ? [home, { label: "Projects", href: "/projects" }, { label, href: path }] : [];
  }
  if (parts[0] === "faculty" && parts.length === 2) {
    const label = faculty.find(item => item.slug === parts[1])?.name;
    return label ? [home, { label: "Faculty", href: "/#faculty" }, { label, href: path }] : [];
  }
  if (parts[0] === "portal" && parts[1] === "learn" && parts[2]) {
    const label = title(parts[2]);
    if (!label || (parts.length !== 3 && !(parts.length === 4 && parts[3] === "tests"))) return [];
    return [home, learningRoot, { label, href: `/portal/learn/${parts[2]}` }, ...(parts[3] === "tests" ? [{ label: "Test series", href: path }] : [])];
  }
  if (!pages[path]) return [];
  if (parts[0] === "solutions" && parts.length === 2) return [home, { label: "Solutions", href: "/solutions" }, { label: pages[path], href: path }];
  // Authentication pages are entry points, rather than children of the protected dashboard.
  return [home, { label: pages[path], href: path }];
}
