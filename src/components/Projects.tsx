import { getMessages, type Locale } from "../i18n/messages";

const Projects = ({ locale = "en" }: { locale?: Locale }) => {
  const copy = getMessages(locale);
  return (
  <span>
    <strong>salaciak-web</strong><br />
    {copy.projects.description}
    <br />
    <a href="https://github.com/msalade/salaciak-web" target="_blank" rel="noopener noreferrer">
      {copy.projects.source}
    </a><br />
  </span>);
};

export default Projects;
