import { z } from "zod";
import { deviceUsersInput, deviceUsersOutput } from ".";

export const findDeviceUsersInput = z.object({
  filter: deviceUsersInput,
});
export type FindDeviceUsersInput = z.infer<typeof findDeviceUsersInput>;

export const findDeviceUsersOutput = deviceUsersOutput;
export type FindDeviceUsersOutput = z.infer<typeof findDeviceUsersOutput>;
