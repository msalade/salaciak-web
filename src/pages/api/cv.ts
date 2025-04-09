import type { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { withCaptchaValidator } from "../../captcha/captchaDecorator";

type Data = {
  email: string;
};

type Error = {
  message: string;
};

const handler = async (
  _: NextApiRequest,
  res: NextApiResponse<Data | Error>
) => {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=SeniorSoftwareDeveloperMS.pdf"
  );

  try {
    const { body } = await fetch(process.env.CSV_DOWNLOAD_URL as string);

    if (body == null) {
      return res.status(404);
    }

    await pipeline(Readable.fromWeb(body as any), res);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default withCaptchaValidator(handler);
