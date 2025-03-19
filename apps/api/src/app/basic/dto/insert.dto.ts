import { DeviceInsertInputSchema } from "@/lib/trpc/schemas/devices";
import { EmailServiceInsertInputSchema } from "@/lib/trpc/schemas/email/services";
import { KeyInsertInputSchema } from "@/lib/trpc/schemas/keys";
import { OrganizationInsertInputSchema } from "@/lib/trpc/schemas/organizations";
import { PermissionInsertInputSchema } from "@/lib/trpc/schemas/permissions";
import { RoleInsertInputSchema } from "@/lib/trpc/schemas/roles";
import { SessionInsertInputSchema } from "@/lib/trpc/schemas/sessions";
import { SSOInsertInputSchema } from "@/lib/trpc/schemas/sso";
import { UserInsertInputSchema } from "@/lib/trpc/schemas/users";

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

export type UserInsertInput = {
  schema: "User";
  doc: UserInsertInputSchema;
};

export type InsertInput =
  | DeviceInsertInput
  | EmailServiceInsertInput
  | KeyInsertInput
  | OrganizationInsertInput
  | PermissionInsertInput
  | RoleInsertInput
  | SessionInsertInput
  | SSOInsertInput
  | UserInsertInput;
