import Recaptcha from "react-google-recaptcha";

type CaptchaProps = {
  sitekey?: string;
  onChange?: (token: string | null) => void;
};

const Captcha = ({
  sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_WEB_SECRET,
  onChange,
}: CaptchaProps) => sitekey
  ? <Recaptcha sitekey={sitekey} onChange={onChange} />
  : <span>CAPTCHA is currently unavailable.</span>;

export default Captcha;
