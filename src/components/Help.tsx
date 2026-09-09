import Link from "next/link";
import { getMessages, type Locale } from "../i18n/messages";

const Help = ({ locale = "en" }: { locale?: Locale }) => {
  const copy = getMessages(locale);
  return (
  <span>
    {copy.help.available} <br />
    <strong>projects</strong> - {copy.help.projects}<br />
    <strong>search</strong> - {copy.help.search}<br />
    <strong>ls</strong> - {copy.help.ls}
    <br />
    <strong>cat</strong> - {copy.help.cat} <br />
    <strong>curl</strong> - {copy.help.curl} <br />
    <strong>clear</strong> - {copy.help.clear} <br />
    <strong>theme</strong> - {copy.help.theme}<br />
    <strong>history</strong> - {copy.help.history}<br />
    <strong>accessible</strong> - {copy.help.accessible}<br />
    <strong>motion</strong> - {copy.help.motion}<br />
    <strong>cursor</strong> - {copy.help.cursor}<br />
    <strong>lang</strong> - {copy.help.lang}<br />
    {copy.help.share}<br />
    <Link href="/?command=projects">/?command=projects</Link><br />
    <Link href="/?command=cat%20experience.md">/?command=cat%20experience.md</Link><br />
  </span>);
};

export default Help;
