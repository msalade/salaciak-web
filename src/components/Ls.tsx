import { getMessages, type Locale } from "../i18n/messages";

const Ls = ({ locale = "en" }: { locale?: Locale }) => {
  const copy = getMessages(locale);
  return (
  <span>
    .<br />
    ├── {copy.ls.about}
    <br />
    ├── {copy.ls.image}
    <br />
    ├── {copy.ls.experience}
    <br />
    ├── {copy.ls.tech}
    <br />
    ├── {copy.ls.contact}
    <br />
    ├── {copy.ls.social}
    <br />
    └── {copy.ls.cv}
  </span>);
};

export default Ls;
