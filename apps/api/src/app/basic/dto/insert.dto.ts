import { ClientInsertInputSchema } from "@/lib/trpc/schemas/clients";
import { ClienteleInsertInputSchema } from "@/lib/trpc/schemas/clienteles";
import { DeviceInsertInputSchema } from "@/lib/trpc/schemas/devices";
import { EmailServiceInsertInputSchema } from "@/lib/trpc/schemas/email/services";
import { KeyInsertInputSchema } from "@/lib/trpc/schemas/keys";
import { OrganizationInsertInputSchema } from "@/lib/trpc/schemas/organizations";
import { PermissionInsertInputSchema } from "@/lib/trpc/schemas/permissions";
import { RoleInsertInputSchema } from "@/lib/trpc/schemas/roles";
import { SessionInsertInputSchema } from "@/lib/trpc/schemas/sessions";
import { SSOInsertInputSchema } from "@/lib/trpc/schemas/sso";

export type ClienteleInsertInput = {
  schema: "Clientele";
  doc: ClienteleInsertInputSchema;
};

export type ClientInsertInput = {
  schema: "Client";
  doc: ClientInsertInputSchema;
};

export type DeviceInsertInput = {
  schema: "Device";
  doc: DeviceInsertInputSchema;
};

export type EmailServiceInsertInput = {
  schema: "Email_Service";
  doc: EmailServiceInsertInputSchema;
};

export type KeyInsertInput = {
  schema: "Key";
  doc: KeyInsertInputSchema;
};

export type OrganizationInsertInput = {
  schema: "Organization";
  doc: OrganizationInsertInputSchema;
};

export type PermissionInsertInput = {
  schema: "Permission";
  doc: PermissionInsertInputSchema;
};

export type RoleInsertInput = {
  schema: "Role";
  doc: RoleInsertInputSchema;
};

export type SessionInsertInput = {
  schema: "Session";
  doc: SessionInsertInputSchema;
};

export type SSOInsertInput = {
  schema: "SSO";
  doc: SSOInsertInputSchema;
};

export type InsertInput =
  | ClienteleInsertInput
  | ClientInsertInput
  | DeviceInsertInput
  | EmailServiceInsertInput
  | KeyInsertInput
  | OrganizationInsertInput
  | PermissionInsertInput
  | RoleInsertInput
  | SessionInsertInput
  | SSOInsertInput;
