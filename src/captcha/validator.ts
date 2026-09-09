export const createValidator = (secret = process.env.RECAPTCHA_API_SECRET) => ({
  isValid: async (token: string): Promise<boolean> => {
    if (!secret) throw new Error("CAPTCHA is not configured");
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error("CAPTCHA verification failed");
    const result: unknown = await response.json();
    return typeof result === "object" && result !== null &&
      "success" in result && result.success === true;
  },
});

export default createValidator();
