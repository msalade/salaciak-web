import { memo, useState } from "react";
import { useEmailContext } from "../context/EmailContext";
import Captcha from "./Captcha";
import { getMessages, type Locale } from "../i18n/messages";

const Contact = ({ locale = "en" }: { locale?: Locale }) => {
  const copy = getMessages(locale);
  const [message, setMessage] = useState("");
  const { setEmail, email } = useEmailContext();

  const getEmail = async (token: string | null) => {
    if (!token) {
      setMessage(copy.captcha.tokenError);
      return;
    }
    setMessage("");
    try {
      const response = await fetch(`/api/email?token=${encodeURIComponent(token)}`, { cache: "no-store" });
      const result: unknown = await response.json();
      if (response.ok && typeof result === "object" && result !== null &&
          "email" in result && typeof result.email === "string") {
        setEmail(result.email);
      } else {
        setMessage(copy.contact.error);
      }
    } catch {
      setMessage(copy.contact.error);
    }
  };

  return <><Captcha onChange={getEmail} locale={locale} />{email || message}</>;
};

export default memo(Contact);
