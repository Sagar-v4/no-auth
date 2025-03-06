import { z } from "zod";

export const STATUS = ["ACTIVE", "BLOCKED", "DELETED"] as const;
export const STATUS_ENUM = z.enum(STATUS);
export type StatusEnum = z.infer<typeof STATUS_ENUM>;
