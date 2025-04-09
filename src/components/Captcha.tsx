import Recaptcha from "react-google-recaptcha";

type CaptchaProps = {
  sitekey?: string;
  onChange?: (token: string | null) => void | undefined;
};

const Captcha = ({
  sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_WEB_SECRET as string,
  onChange,
}: CaptchaProps) => <Recaptcha sitekey={sitekey} onChange={onChange} />;

export default Captcha;
