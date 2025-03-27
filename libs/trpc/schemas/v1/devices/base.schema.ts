import { z } from "zod";
import { STATUS_ENUM } from ".";

export const userRecord = z.record(
  z.string().uuid().nonempty(),
  z.object({
    log_in_at: z.date(),
  }),
);
export type UserRecord = z.infer<typeof userRecord>;

export const sessions = z.record(
  z.string().uuid().nonempty(),
  z.object({
    jti: z.string().uuid().nonempty(),
    users: userRecord,
  }),
);
export type Sessions = z.infer<typeof sessions>;

const users: UserRecord = {
  user1: {
    log_in_at: new Date(),
  },
  user2: {
    log_in_at: new Date(),
  },
};
const session: Sessions = {
  org1: {
    jti: "abc123",
    users: {
      user1: {
        log_in_at: new Date(),
      },
      user2: {
        log_in_at: new Date(),
      },
    },
  },
  orgq: {
    jti: "abc123",
    users: {
      user1: {
        log_in_at: new Date(),
      },
      user2: {
        log_in_at: new Date(),
      },
    },
  },
};

export const deviceInput = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  status: STATUS_ENUM.optional(),
  sessions: sessions.optional(),
});
export type DeviceInput = z.infer<typeof deviceInput>;

export const deviceOutput = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  status: STATUS_ENUM,
  sessions: sessions.optional(),
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type DeviceOutput = z.infer<typeof deviceOutput>;

export const deviceInsertInput = z.object({});
export type DeviceInsertInput = z.infer<typeof deviceInsertInput>;

export const deviceIdInput = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type DeviceIdInput = z.infer<typeof deviceIdInput>;

export const deviceUpdateInput = z.object({
  status: STATUS_ENUM.optional(),
  sessions: sessions.optional(),
});
export type DeviceUpdateInput = z.infer<typeof deviceUpdateInput>;

export const deviceUsersInput = z
  .object({
    sso_uuid: z.string().uuid().nonempty(),
    device_uuid: z.string().uuid().nonempty(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type DeviceUsersInput = z.infer<typeof deviceUsersInput>;

export const deviceUsersOutput = z.array(
  z.object({
    active: z.boolean(),
    log_in_at: z.date(),
    name: z.string().nonempty(),
    uuid: z.string().uuid().nonempty(),
    email: z.string().email().nonempty(),
  }),
);
export type DeviceUsersOutput = z.infer<typeof deviceUsersOutput>;
