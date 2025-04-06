import { memo, useState } from "react";
import Recaptcha from "react-google-recaptcha";
import { useEmailContext } from "../context/EmailContext";

const Contact = () => {
  const [message, setMessage] = useState("");
  const { setEmail, email } = useEmailContext();

  const getEmail = (token: string | null) => {
    if (token === null) {
      setMessage("Could not extract recaptcha token");
    } else {
      fetch(`/api/email?token=${token}`)
        .then(async (resp) => {
          const respJson = await resp.json();
          if (resp.status === 200) {
            setEmail(respJson.email || "Email not found");
          }

          if (resp.status === 400) {
            setMessage(respJson.message || "Email not found");
          }
        })
        .catch((err) => setMessage(`Could not fetch email: ${err.message}`));
    }
  };

  return (
    <>
      <Recaptcha
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_WEB_SECRET as string}
        onChange={getEmail}
      />
      {email || message}
    </>
  );
};

export default memo(Contact);
