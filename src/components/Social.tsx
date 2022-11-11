import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const Social = () => (
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
);

export default Social;
