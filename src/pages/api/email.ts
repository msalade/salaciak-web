import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  email: string;
};

type Error = {
  message: string;
};

const createCaptchaValidationRequest = (secret: string, captchaValue: string) =>
  `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captchaValue}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const token = req.query.token;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  if (typeof token !== "string") {
    return res.status(400).json({ message: "Token must be string" });
  }

  try {
    const validationUrl = createCaptchaValidationRequest(
      process.env.RECAPTCHA_API_SECRET!,
      token as string
    );
    const resp = await fetch(validationUrl, {
      headers: {
        "Content-Type": "json",
      },
    }).then((resp) => resp.json());

    if (resp.success) {
        res.status(200).json({ email: process.env.EMAIL as string });
    } else {
        res.status(400).json({ message: 'Invalid token' });
    }

  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
