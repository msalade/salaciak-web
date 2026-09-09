import { withCaptchaValidator } from "../../captcha/captchaDecorator";

export default withCaptchaValidator<{ email: string }>((_, res) => {
  const email = process.env.EMAIL;
  if (!email) {
    return res.status(503).json({ message: "Email is unavailable" });
  }
  res.status(200).json({ email });
});
