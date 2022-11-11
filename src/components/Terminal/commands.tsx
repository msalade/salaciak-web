import Image from "next/image";
import { Fragment } from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const helpData = [
  {
    command: "way",
    description: "about me 👋",
  },
  {
    command: "exp",
    description: "my experience",
  },
  {
    command: "tech",
    description: "my weapons",
  },
  {
    command: "social",
    description: "communication channels",
  },
  {
    command: "clear",
    description: "clears the console",
  },
];

const expData = [
  {
    title: "Software Development Engineer II",
    company: "Apptio · Full-timeApptio · Full-time · Feb 2022 - Present · 10 mos",
    description: `Coming soon`,
  },
  {
    title: "Full Stack Developer",
    company: "Fulogics · Full-timeFulogics · Full-time · Feb 2021 - Present · 1 yr 10 mos",
    description: `Development and maintenance of software for the transportation industry (TMS and WMS). Provide end to end solutions using APS .NET Core, 
    OData, React.js and Entity Framework. Developing a mobile application for couriers and truck drivers using React Native, Expo and
    Redux.`,
  },
  {
    title: "Senior Analyst",
    company: "Legalcluster · Full-timeLegalcluster · Full-time · May 2018 - Aug 2019 · 1 yr 4 mos",
    description: `Working as a consultant software developer. Designed and delivered a solution for backend and frontend web applications used by a security company and its customers. Cooperated with designers to create clean interfaces providing simple, intuitive interactions and experiences.`,
  },
  {
    title: "Junior Full Stack Developer",
    company: "Legalcluster · Full-time 1yr · 4 mos",
    description: `Working on Request for Proposal software and social network platform for
    lawyers. Creating backend application with use of .NET Core/Framework and
    frontend SPA page with React. Project was base on NoSQL and Graph
    databases.`,
  },
];

export const commands = {
  help: (
    <span>
      {helpData.map(({ command, description }) => (
        <Fragment key={command + description}>
          <strong>{command}</strong> - {description} <br />
        </Fragment>
      ))}
    </span>
  ),
  way: () => {
    const exp = Math.abs(new Date(Date.now()).getUTCFullYear() - 2018);

    return (
      <span>
        Hello 👋 <br />
        My name is <strong>Michał Sałaciak</strong>. <br />
        I&apos;m <strong>full stack</strong> software developer with {exp} years
        of industry experience building websites, web and mobile applications.
        <br />
        <br />
        me.jpeg
        <br />
        <Image src="/me.jpeg" height={167} width={125} alt="me" />
        <br />
      </span>
    );
  },
  exp: (
    <span>
      {expData.map(({ title, company, description }) => (
        <Fragment key={title + company}>
          <strong>{title}</strong>
          <br />
          {company} <br /> <br />
          {description}
          <br />
          <br />
          <hr />
          <br />
        </Fragment>
      ))}
    </span>
  ),
  tech: (
    <span>
      <strong>.NET</strong>, <strong>Node.js</strong>, <strong>React</strong>,{" "}
      <strong>React Native</strong>, <strong>C#</strong>,{" "}
      <strong>JavaScript</strong>, <strong>TypeScript</strong>
      <br />
    </span>
  ),
  social: (
    <span>
      <a
        href="https://www.linkedin.com/in/michal-salaciak/"
        target="_blank"
        rel="noreferrer"
      >
        <AiFillLinkedin /> <strong>Linkedin</strong>
      </a>{" "}
      <br />
      <a href="https://github.com/msalade" target="_blank" rel="noreferrer">
        <AiFillGithub /> <strong>Github</strong>
      </a>{" "}
      <br />
    </span>
  ),
};
