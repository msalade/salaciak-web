import type { NextApiRequest, NextApiResponse } from "next";
import { withCaptchaValidator } from "../../captcha/captchaDecorator";

type Data = {
  email: string;
};

type Error = {
  message: string;
};

export default withCaptchaValidator(
  (_: NextApiRequest, res: NextApiResponse<Data | Error>) => {
    res.status(200).json({ email: process.env.EMAIL as string });
  }
);
