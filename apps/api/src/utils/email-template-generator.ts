import { LoginMethodsEnum } from "@/lib/trpc/schemas/v1/users";

export function generateEmailTemplate(
  method: LoginMethodsEnum,
  secret: string,
  url: string,
  email_service_uuid: string,
): {
  subject: string;
  text: string;
  html?: string;
} {
  switch (method) {
    case "OTP": {
      return {
        subject: "One-Time Password (OTP)",
        text: `Your one-time password (OTP) is: ${secret}`,
      };
    }

    case "MAGIC_LINK": {
      const link = `${url}/${email_service_uuid}/${secret}`;
      return {
        subject: "Magic Link",
        text: `Please use the following magic link to access your account: ${url}/secret/${secret}`,
        html: `<p>Please click the following magic link to access your account: <a href="${link}">${link}</a></p>`,
      };
    }

    default: {
      throw new Error("Invalid secret generator method");
    }
  }
}
