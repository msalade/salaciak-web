import type { NextApiHandler } from "next";
import captchaValidator from "./validator";

export const withCaptchaValidator =
  <T>(handler: NextApiHandler<T>): NextApiHandler<unknown> =>
  async (req, res) => {
    const token = req.query.token as string;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    if (typeof token !== "string") {
      return res.status(400).json({ message: "Token must be string" });
    }

    try {
      const isTokenValid = await captchaValidator.isValid(token);

      if (!isTokenValid) {
        return res.status(400).json({ message: "Invalid token" });
      }

      handler(req, res);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
