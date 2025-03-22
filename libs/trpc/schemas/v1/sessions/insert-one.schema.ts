import { z } from "zod";
import { sessionInsertInput, sessionOutput } from ".";

export const insertOneSessionInput = z.object({
  doc: sessionInsertInput,
});
export type InsertOneSessionInput = z.infer<typeof insertOneSessionInput>;

export const insertOneSessionOutput = sessionOutput;
export type InsertOneSessionOutput = z.infer<typeof insertOneSessionOutput>;
