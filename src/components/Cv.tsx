import { memo, useState } from "react";
import Captcha from "./Captcha";

const Cv = () => {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const getEmail = (token: string | null) => {
    if (token === null) {
      setMessage("Could not extract recaptcha token");
    } else {
      setToken(token);
    }
  };

  return (
    <>
      <Captcha onChange={getEmail} />
      {message ||
        (token && (
          <a href={`/api/cv?token=${token}`}>
            Download CSV
          </a>
        ))}
    </>
  );
};

export default memo(Cv);
