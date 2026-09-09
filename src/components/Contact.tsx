import { memo, useState } from "react";
import { useEmailContext } from "../context/EmailContext";
import Captcha from "./Captcha";

const Contact = () => {
  const [message, setMessage] = useState("");
  const { setEmail, email } = useEmailContext();

  const getEmail = async (token: string | null) => {
    if (!token) {
      setMessage("Could not extract recaptcha token");
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
        setMessage("Could not fetch email. Please try again.");
      }
    } catch {
      setMessage("Could not fetch email. Please try again.");
    }
  };

  return <><Captcha onChange={getEmail} />{email || message}</>;
};

export default memo(Contact);
