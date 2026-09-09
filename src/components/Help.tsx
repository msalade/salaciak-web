import Link from "next/link";

const Help = () => (
  <span>
    Available commands: <br />
    <strong>projects</strong> - explore portfolio projects<br />
    <strong>ls</strong> - list directory contents
    <br />
    <strong>cat</strong> - concatenate files and print on the standard output.
    Example: cat [FILE] <br />
    <strong>curl</strong> - download file.
    Example: curl [FILE] <br />
    <strong>pong</strong> - play Pong game <br />
    <strong>clear</strong> - clear console content <br />
    <strong>theme</strong> - set theme<br />
    Share a command by adding it to the URL, for example:<br />
    <Link href="/?command=projects">/?command=projects</Link><br />
    <Link href="/?command=cat%20experience.md">/?command=cat%20experience.md</Link><br />
  </span>
);

export default Help;
