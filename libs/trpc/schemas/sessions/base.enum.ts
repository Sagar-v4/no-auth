import { z } from "zod";

export const STATUS = ["ACTIVE", "DEACTIVATED", "EXPIRED", "DELETED"] as const;
export const STATUS_ENUM = z.enum(STATUS);
export type StatusEnum = z.infer<typeof STATUS_ENUM>;

export const USER_TYPE = ["Client", "Clientele"] as const;
export const USER_TYPE_ENUM = z.enum(USER_TYPE);
export type UserTypeEnum = z.infer<typeof USER_TYPE_ENUM>;
