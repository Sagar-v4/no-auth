import { z } from "zod";

export const accessToken = z.string();
export type AccessToken = z.infer<typeof accessToken>;

export const accessTokenCreate = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  user_id: z.string().nonempty(),
  device_id: z.string().nonempty(),
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type AccessTokenCreate = z.infer<typeof accessTokenCreate>;

export const accessTokenPayload = z.object({
  iss: z.string().nonempty(), // no auth
  sub: z.string().uuid().nonempty(), // user
  aud: z.string().uuid().nonempty(), // org
  did: z.string().uuid().nonempty(), // device
  sid: z.string().uuid().nonempty(), // session
});
export type AccessTokenPayload = z.infer<typeof accessTokenPayload>;
