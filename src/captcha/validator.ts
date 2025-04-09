const createCaptchaValidationRequest = (secret: string, captchaValue: string) =>
  `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captchaValue}`;

export const createValidator = (
  secret: string = process.env.RECAPTCHA_API_SECRET!
) => {
  return {
    isValid: async (token: string): Promise<boolean> => {
      const validationUrl = createCaptchaValidationRequest(secret, token);
      const response = await fetch(validationUrl, {
        headers: {
          "Content-Type": "json",
        },
      });
      const { success } = await response.json();

      return success;
    },
  };
};

export default createValidator();
