import { z } from "zod";

export const STATUS = ["PREACTIVE", "ACTIVE", "BLOCKED", "DELETED"] as const;
export const STATUS_ENUM = z.enum(STATUS);
export type StatusEnum = z.infer<typeof STATUS_ENUM>;

export const TYPES = ["OTP", "MAGIC_LINK"] as const;
export const TYPES_ENUM = z.enum(TYPES);
export type TypesEnum = z.infer<typeof TYPES_ENUM>;
