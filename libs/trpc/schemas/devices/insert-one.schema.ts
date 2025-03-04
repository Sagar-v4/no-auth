import { z } from "zod";
import { deviceInsertInputSchema, deviceOutputSchema } from ".";

export const insertOneDeviceInputSchema = z.object({
  doc: deviceInsertInputSchema,
});
export type InsertOneDeviceInputType = z.infer<
  typeof insertOneDeviceInputSchema
>;

export const insertOneDeviceOutputSchema = deviceOutputSchema;
export type InsertOneDeviceOutputType = z.infer<
  typeof insertOneDeviceOutputSchema
>;
