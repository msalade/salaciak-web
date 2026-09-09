import { memo, useState } from "react";
import Captcha from "./Captcha";

const Cv = () => {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const getEmail = (token: string | null) => {
    if (token === null) {
      setToken("");
      setMessage("Could not extract recaptcha token");
    } else {
      setMessage("");
      setToken(token);
    }
  };

  return (
    <>
      <Captcha onChange={getEmail} />
      {message ||
        (token && (
          <a href={`/api/cv?token=${encodeURIComponent(token)}`} target="_blank" rel="noopener noreferrer">
            Download CV
          </a>
        ))}
    </>
  );
};

export default memo(Cv);
