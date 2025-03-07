import { z } from "zod";
import { STATUS_ENUM } from ".";

export const clienteleInputSchema = z.object({
  _id: z.string().optional(),
  uuid: z.string().uuid().optional(),
  organization_id: z.string().optional(),
  status: STATUS_ENUM.optional(),
});
export type clienteleDataInputType = z.infer<typeof clienteleInputSchema>;

export const clienteleOutputSchema = z.object({
  _id: z.custom<any>(),
  uuid: z.string().uuid().nonempty(),
  organization_id: z.string().optional(),
  status: STATUS_ENUM,
  metadata: z.object({}).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type ClienteleOutputSchema = z.infer<typeof clienteleOutputSchema>;

export const clienteleInsertInputSchema = z.object({
  organization_id: z.string().nonempty(),
});
export type ClienteleInsertInputSchema = z.infer<
  typeof clienteleInsertInputSchema
>;

export const clienteleIdInputSchema = z
  .object({
    _id: z.string().optional(),
    uuid: z.string().uuid().optional(),
  })
  .refine((data) => !Object.values(data).every((value) => !value));
export type ClienteleIdInputSchema = z.infer<typeof clienteleIdInputSchema>;

export const clienteleUpdateInputSchema = z.object({
  status: STATUS_ENUM.optional(),
});
export type ClienteleUpdateInputSchema = z.infer<
  typeof clienteleUpdateInputSchema
>;
