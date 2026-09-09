import Image from "next/image";
import { getMessages, type Locale } from "../i18n/messages";

const exp = Math.abs(new Date(Date.now()).getUTCFullYear() - 2018);

const AboutMe = ({ locale = "en" }: { locale?: Locale }) => {
  const copy = getMessages(locale);
  return (
  <span>
    {copy.about.greeting} <br />
    {copy.about.name} <strong>Michał Sałaciak</strong>. <br />
    {copy.about.summary(exp)} {copy.about.background}
    <br />
    <br />
    me.jpeg
    <br />
    <Image src="/me.jpeg" height={167} width={125} alt={copy.about.imageAlt} />
    <br />
  </span>);
};

export default AboutMe;
