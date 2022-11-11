import Image from "next/image";
import Help from "./Help";
import Ls from "./Ls";
import AboutMe from "./AboutMe";
import Experience from "./Experience";
import Tech from "./Tech";
import Contact from "./Contact";
import Social from "./Social";

const expData = [
  {
    title: "Software Development Engineer II",
    company:
      "Apptio · Full-timeApptio · Full-time · Feb 2022 - Present · 10 mos",
    description: `Coming soon`,
  },
  {
    title: "Full Stack Developer",
    company:
      "Fulogics · Full-timeFulogics · Full-time · Feb 2021 - Present · 1 yr 10 mos",
    description: `Development and maintenance of software for the transportation industry (TMS and WMS). Provide end to end solutions using APS .NET Core, 
    OData, React.js and Entity Framework. Developing a mobile application for couriers and truck drivers using React Native, Expo and
    Redux.`,
  },
  {
    title: "Senior Analyst",
    company:
      "Legalcluster · Full-timeLegalcluster · Full-time · May 2018 - Aug 2019 · 1 yr 4 mos",
    description: `Working as a consultant software developer. Designed and delivered a solution for backend and frontend web applications used by a security company and its customers. Cooperated with designers to create clean interfaces providing simple, intuitive interactions and experiences.`,
  },
  {
    title: "Junior Full Stack Developer",
    company: "Legalcluster · Full-time · May 2018 - Aug 2019 · 1 yr 4 mos",
    description: `Working on Request for Proposal software and social network platform for
    lawyers. Creating backend application with use of .NET Core/Framework and
    frontend SPA page with React. Project was base on NoSQL and Graph
    databases.`,
  },
];

export const commands = {
  help: Help,
  ls: Ls,
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
        return <Social />
      }
      default: {
        return <span>cat: {file}: No such file or directory</span>;
      }
    }
  },
};
