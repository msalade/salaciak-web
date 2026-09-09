import Link from "next/link";
import { getMessages, type Locale } from "../i18n/messages";
import { commandHref } from "../terminal/autocomplete";
import styles from "./AccessiblePortfolio.module.css";

type AccessiblePortfolioProps = { locale?: Locale };

const experience = [
  ["Senior Software Engineer", "Apptio · 2023–present"],
  ["Software Development Engineer II", "Apptio · 2022–2023"],
  ["Full Stack Developer", "Fulogics · 2021–present"],
  ["Senior Analyst", "Legalcluster · 2018–2019"],
  ["Junior Full Stack Developer", "Legalcluster · 2018–2019"],
] as const;

const skills = [".NET", "Node.js", "React", "TypeScript", "Kubernetes", "MongoDB", "PostgreSQL", "OpenTelemetry"];

export default function AccessiblePortfolio({ locale = "en" }: AccessiblePortfolioProps) {
  const copy = getMessages(locale);
  return (
    <section className={styles.view} aria-labelledby="accessible-portfolio-title">
      <h1 id="accessible-portfolio-title">{copy.accessibility.title}</h1>
      <p>{copy.accessibility.intro}</p>

      <section aria-labelledby="accessible-experience-title">
        <h2 id="accessible-experience-title">{copy.accessibility.experience}</h2>
        <ol>
          {experience.map(([title, company]) => (
            <li key={`${title}-${company}`}>
              <strong>{title}</strong> <span>{company}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="accessible-skills-title">
        <h2 id="accessible-skills-title">{copy.accessibility.skills}</h2>
        <ul>
          {skills.map((skill) => <li key={skill}>{skill}</li>)}
        </ul>
      </section>

      <section aria-labelledby="accessible-projects-title">
        <h2 id="accessible-projects-title">{copy.accessibility.projects}</h2>
        <p><Link href={commandHref("projects", locale)}>projects</Link></p>
      </section>

      <section aria-labelledby="accessible-contact-title">
        <h2 id="accessible-contact-title">{copy.accessibility.contact}</h2>
        <p><Link href={commandHref("cat contact.md", locale)}>cat contact.md</Link></p>
      </section>
    </section>
  );
}
