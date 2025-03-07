import { z } from "zod";

export const STATUS = ["ACTIVE", "BLOCKED", "DELETED"] as const;
export const STATUS_ENUM = z.enum(STATUS);
export type StatusEnum = z.infer<typeof STATUS_ENUM>;

export const LOGIN_METHODS = ["EMAIL_OTP"] as const;
export const LOGIN_METHODS_ENUM = z.enum(LOGIN_METHODS);
export type LoginMethodsEnum = z.infer<typeof LOGIN_METHODS_ENUM>;

export const ROLES = ["CLIENT", "ADMIN"] as const;
export const ROLES_ENUM = z.enum(ROLES);
export type RolesEnum = z.infer<typeof ROLES_ENUM>;
