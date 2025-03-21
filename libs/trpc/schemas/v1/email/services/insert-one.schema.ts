import { z } from "zod";
import { emailServiceInsertInput, emailServiceOutput } from ".";

export const insertOneEmailServiceInput = z.object({
  doc: emailServiceInsertInput,
});
export type InsertOneEmailServiceInput = z.infer<
  typeof insertOneEmailServiceInput
>;

export const insertOneEmailServiceOutput = emailServiceOutput;
export type InsertOneEmailServiceOutput = z.infer<
  typeof insertOneEmailServiceOutput
>;
