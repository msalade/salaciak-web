import Image from "next/image";
import Help from "./Help";
import Ls from "./Ls";
import AboutMe from "./AboutMe";
import Experience from "./Experience";
import Tech from "./Tech";
import Contact from "./Contact";
import Social from "./Social";
import Cv from "./Cv";
import { ThemeType } from "./themes";

const expData = [
  {
    title: "Senior Software Engineer",
    company: "Apptio · Full-timeApptio · Full-time · Apr 2023 - Present",
    description: `● Member of the team responsible for various of the Targetprocess Kubernetess microservices and microfrontends - data visualisation, data import/export, search, filters etc. \n ● Closely cooperated with product owners and domain experts on creating new features ● Led performance optimisation initiative on data visualisation Node.js microservices (MongoDB, PostgreSQL and React.js) ● Developed flexible CSV import/export service in Node.JS and PostgreSQL with tracing and monitoring (OpenTelemetry and Prometheus) ● Participated in the migration of the search service base on Elastic from the .NET Framework monolith to .NET core + RabbitMQ microservice ● Collaborated with the Apptio core teams to provide cross data integration with use of csv import/export and AWS SQS ● Technical leadership over data visualisation services - supervision over new features, creation of ADR and reacting on incidents ● Created GitLab pipelines ● Built infrastructure for e2e tests ● Diagnosed and optimised DocumentDB / MongoDB ● Collaborated with other teams to provide cross-team services integration ● Performed technical interviews`,
  },
  {
    title: "Software Development Engineer II",
    company:
      "Apptio · Full-timeApptio · Full-time · Feb 2022 - Apr 2023 · 1 yr 3 mos",
    description: "",
  },
  {
    title: "Full Stack Developer",
    company:
      "Fulogics · Full-timeFulogics · Full-time · Feb 2021 - Present · 1 yr 10 mos",
    description: `● Member of RND team responsible for the frontend and backend of freight forwarding (TMS and WMS) ● Developed mobile application with React Native, Expo and Redux for truck drivers and couriers ● Designed and delivered components for shared UI libraries ● Provided end-to-end solutions with use of APS .NET Core, OData, React.js and Entity Framework ● Setup applications – pipelines and releases ● Supervised and mentored a junior developer`,
  },
  {
    title: "Senior Analyst",
    company:
      "Legalcluster · Full-timeLegalcluster · Full-time · May 2018 - Aug 2019 · 1 yr 4 mos",
    description: `● Member of the team responsible for the frontend and backend of the risk prediction platform ● Closely cooperated with customer (domain experts) and designers to provide new solutions on the platform ● Maintained Next.js applications and added new functionalities ● Migrated React application from REST and Auth0 to GraphQl (Apollo, Express) and Azure Active Directory ● Performed migration from REST to GraphQl by creation of .Net Core API Gateway ● Created user stories and technical documentation ● Partial supervision of the release process among sub-teams`,
  },
  {
    title: "Junior Full Stack Developer",
    company: "Legalcluster · Full-time · May 2018 - Aug 2019 · 1 yr 4 mos",
    description: `● Member of the team responsible for the frontend and backend of Request for Proposal software and social network platform for lawyers ● Developed backend application with use of .NET Core/Framework (Rest API & SignalR) and frontend SPA page with React and Redux. Project was base on NoSQL and Graph databases. ● Delivered complete solution from backend to frontend autonomously. ● Provide unit tests. ● Use of functionality provided by Azure`,
  },
];

export const commands = (setTheme: (theme: ThemeType) => void) => ({
  help: Help,
  ls: Ls,
  theme: (theme: ThemeType) => {
    switch (theme) {
      case "light":
      case "dark":
      case "total-dark":
      case "material-light":
      case "material-dark":
      case "material-ocean":
      case "matrix":
      case "dracula": {
        setTheme(theme);
        return <span>Theme set!</span>;
      }
      default: {
        return (
          <span>
            theme {theme}: No such theme. Available themes: light, dark,
            total-dark, material-light, material-dark, material-ocean, matrix
            and dracula
          </span>
        );
      }
    }
  },
  curl: (file: string) => {
    switch (file) {
      case "cv.pdf": {
        return <Cv />;
      }
      default: {
        return (
          <span>cat: fail to download {file}, supported extensions: .pdf</span>
        );
      }
    }
  },
  cat: (file: string) => {
    switch (file) {
      case "about_me.md": {
        return <AboutMe />;
      }
      case "me.jpeg": {
        return <Image src="/me.jpeg" height={167} width={125} alt="me" />;
      }
      case "experience.md": {
        return <Experience expData={expData} />;
      }
      case "tech.md": {
        return <Tech />;
      }
      case "contact.md": {
        return <Contact />;
      }
      case "social.md": {
        return <Social />;
      }
      default: {
        return <span>cat: {file}: No such file or directory</span>;
      }
    }
  },
});
