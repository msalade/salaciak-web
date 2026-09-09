import type { NextApiHandler } from "next";
import captchaValidator from "./validator";

export type ApiError = { message: string };

export const withCaptchaValidator =
  <T>(handler: NextApiHandler<T | ApiError>): NextApiHandler<T | ApiError> =>
  async (req, res) => {
    res.setHeader("Cache-Control", "private, no-store");
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ message: "Method not allowed" });
    }
    const token = req.query.token;
    if (typeof token !== "string" || !token.trim() || token.length > 4096) {
      return res.status(400).json({ message: "A valid token is required" });
    }
    try {
      if (!await captchaValidator.isValid(token)) {
        return res.status(400).json({ message: "Invalid token" });
      }
      await handler(req, res);
    } catch {
      if (res.headersSent) {
        res.destroy();
        return;
      }
      res.status(500).json({ message: "Unable to process request" });
    }
  };
