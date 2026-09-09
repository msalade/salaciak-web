export type SearchResult = {
  id: string;
  category: "Experience" | "Skills" | "Projects" | "About";
  title: string;
  excerpt: string;
  command: string;
};

const searchIndex: SearchResult[] = [
  {
    id: "experience-apptio-senior",
    category: "Experience",
    title: "Senior Software Engineer — Apptio",
    excerpt: "Senior Software Engineer at Apptio working on Kubernetes microservices, Node.js, MongoDB, PostgreSQL, React, OpenTelemetry, and Prometheus.",
    command: "cat experience.md",
  },
  {
    id: "experience-apptio-sde",
    category: "Experience",
    title: "Software Development Engineer II — Apptio",
    excerpt: "Software Development Engineer II at Apptio.",
    command: "cat experience.md",
  },
  {
    id: "experience-fulogics",
    category: "Experience",
    title: "Full Stack Developer — Fulogics",
    excerpt: "Full Stack Developer working with React Native, Expo, Redux, .NET Core, OData, Entity Framework, TMS, and WMS.",
    command: "cat experience.md",
  },
  {
    id: "experience-legalcluster-senior",
    category: "Experience",
    title: "Senior Analyst — Legalcluster",
    excerpt: "Senior Analyst working on Next.js, GraphQL, Apollo, Express, .NET Core, Auth0, and Azure Active Directory.",
    command: "cat experience.md",
  },
  {
    id: "experience-legalcluster-junior",
    category: "Experience",
    title: "Junior Full Stack Developer — Legalcluster",
    excerpt: "Junior Full Stack Developer working with .NET Core, React, Redux, REST APIs, SignalR, NoSQL, and graph databases.",
    command: "cat experience.md",
  },
  {
    id: "skills",
    category: "Skills",
    title: "Technology stack",
    excerpt: ".NET, Node.js, React, Kubernetes, MongoDB, PostgreSQL, React Native, C#, JavaScript, and TypeScript.",
    command: "cat tech.md",
  },
  {
    id: "project-salaciak-web",
    category: "Projects",
    title: "salaciak-web",
    excerpt: "Interactive terminal portfolio built with Next.js, React, and TypeScript.",
    command: "projects",
  },
  {
    id: "about",
    category: "About",
    title: "Michał Sałaciak",
    excerpt: "Senior Software Engineer specializing in full-stack development, microservices, and cloud-based solutions.",
    command: "cat about_me.md",
  },
];

export function searchPortfolio(query: string): SearchResult[] {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized || normalized.length > 256) return [];
  const terms = normalized.split(/\s+/);
  return searchIndex.filter((result) => {
    const haystack = `${result.category} ${result.title} ${result.excerpt}`.toLocaleLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}
