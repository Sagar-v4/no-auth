import { z } from "zod";

export const STATUS = ["ACTIVE", "BLOCKED", "DELETED"] as const;
export const STATUS_ENUM = z.enum(STATUS);
export type StatusEnum = z.infer<typeof STATUS_ENUM>;

export const LOGIN_METHODS = ["OTP", "MAGIC_LINK"] as const;
export const LOGIN_METHODS_ENUM = z.enum(LOGIN_METHODS);
export type LoginMethodsEnum = z.infer<typeof LOGIN_METHODS_ENUM>;

export const NO_AUTH_USER_ROLES = ["CLIENT", "ADMIN"] as const;
export const NO_AUTH_USER_ROLES_ENUM = z.enum(NO_AUTH_USER_ROLES);
export type NoAuthUserRolesEnum = z.infer<typeof NO_AUTH_USER_ROLES_ENUM>;
