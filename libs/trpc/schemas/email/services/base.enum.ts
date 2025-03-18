import { z } from "zod";

export const USER_TYPE = ["Client", "Clientele"] as const;
export const USER_TYPE_ENUM = z.enum(USER_TYPE);
export type UserTypeEnum = z.infer<typeof USER_TYPE_ENUM>;
