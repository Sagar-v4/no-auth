import { z } from "zod";

export const refreshToken = z.string();
export type RefreshToken = z.infer<typeof refreshToken>;

export const refreshTokenCreate = z.object({
  sso_uuid: z.string().uuid().nonempty(),
  user_uuid: z.string().uuid().nonempty(),
});
export type RefreshTokenCreate = z.infer<typeof refreshTokenCreate>;

export const refreshTokenPayload = z.object({
  iss: z.string().nonempty(), // no auth
  sub: z.string().uuid().array(), // users
  act: z.string().uuid().nonempty(), // active user
  aud: z.string().uuid().nonempty(), // org
  did: z.string().uuid().nonempty(), // device
  jti: z.string().uuid().nonempty(), // session
  sso: z.string().uuid().nonempty(), // session
  iat: z.number().optional(), // init
  exp: z.number().optional(), // expire
});
export type RefreshTokenPayload = z.infer<typeof refreshTokenPayload>;

export const signedRefreshToken = z.object({
  rt: z.string().nonempty(),
  did: z.string().uuid().nonempty(),
  redirect: z.string().url().nonempty(),
});
export type SignedRefreshToken = z.infer<typeof signedRefreshToken>;
