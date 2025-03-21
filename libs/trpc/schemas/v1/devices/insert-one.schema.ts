import { z } from "zod";
import { deviceInsertInput, deviceOutput } from ".";

export const insertOneDeviceInput = z.object({
  doc: deviceInsertInput,
});
export type InsertOneDeviceInput = z.infer<typeof insertOneDeviceInput>;

export const insertOneDeviceOutput = deviceOutput;
export type InsertOneDeviceOutput = z.infer<typeof insertOneDeviceOutput>;
