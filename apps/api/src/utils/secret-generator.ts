import { LoginMethodsEnum } from "@/lib/trpc/schemas/v1/users";

export function generateSecret(
  method: LoginMethodsEnum,
  length?: number,
): string {
  let characters: string;
  switch (method) {
    case "OTP": {
      characters = "0123456789";
      if (!length || length <= 0) length = 6;
      break;
    }

    case "MAGIC_LINK": {
      characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      if (!length || length <= 0) length = 12;
      break;
    }

    default: {
      throw new Error("Invalid secret generator method");
    }
  }

  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length)),
  ).join("");
}
