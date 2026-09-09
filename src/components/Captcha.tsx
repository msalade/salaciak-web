import Recaptcha from "react-google-recaptcha";
import { getMessages, type Locale } from "../i18n/messages";

type CaptchaProps = {
  sitekey?: string;
  onChange?: (token: string | null) => void;
  locale?: Locale;
};

const Captcha = ({
  sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_WEB_SECRET,
  onChange,
  locale = "en",
}: CaptchaProps) => sitekey
  ? <Recaptcha sitekey={sitekey} onChange={onChange} />
  : <span>{getMessages(locale).captcha.unavailable}</span>;

export default Captcha;
