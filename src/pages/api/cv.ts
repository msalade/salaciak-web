import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { withCaptchaValidator } from "../../captcha/captchaDecorator";

export default withCaptchaValidator(async (_, res) => {
  const downloadUrl = process.env.CSV_DOWNLOAD_URL;
  if (!downloadUrl) {
    return res.status(503).json({ message: "CV download is unavailable" });
  }
  const response = await fetch(downloadUrl, {
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok || !response.body) {
    await response.body?.cancel();
    return res.status(502).json({ message: "CV download is unavailable" });
  }
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=SeniorSoftwareDeveloperMS.pdf");
  await pipeline(Readable.fromWeb(response.body), res);
});
