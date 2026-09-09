import { memo, useState } from "react";
import Captcha from "./Captcha";
import { getMessages, type Locale } from "../i18n/messages";

const Cv = ({ locale = "en" }: { locale?: Locale }) => {
  const copy = getMessages(locale);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const getEmail = (token: string | null) => {
    if (token === null) {
      setToken("");
      setMessage(copy.captcha.tokenError);
    } else {
      setMessage("");
      setToken(token);
    }
  };

  return (
    <>
      <Captcha onChange={getEmail} locale={locale} />
      {message ||
        (token && (
          <a href={`/api/cv?token=${encodeURIComponent(token)}`} target="_blank" rel="noopener noreferrer">
            {copy.cv.download}
          </a>
        ))}
    </>
  );
};

export default memo(Cv);
