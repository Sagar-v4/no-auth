import { DeviceInsertInput } from "@/lib/trpc/schemas/v1/devices";
import { EmailServiceInsertInput } from "@/lib/trpc/schemas/v1/email/services";
import { KeyInsertInput } from "@/lib/trpc/schemas/v1/keys";
import { OrganizationInsertInput } from "@/lib/trpc/schemas/v1/organizations";
import { PermissionInsertInput } from "@/lib/trpc/schemas/v1/permissions";
import { RoleInsertInput } from "@/lib/trpc/schemas/v1/roles";
import { SessionInsertInput } from "@/lib/trpc/schemas/v1/sessions";
import { SSOInsertInput } from "@/lib/trpc/schemas/v1/sso";
import { UserInsertInput } from "@/lib/trpc/schemas/v1/users";

export type DeviceInsertInputDto = {
  schema: "Device";
  doc: DeviceInsertInput;
};

export type EmailServiceInsertInputDto = {
  schema: "Email_Service";
  doc: EmailServiceInsertInput;
};

export type KeyInsertInputDto = {
  schema: "Key";
  doc: KeyInsertInput;
};

export type OrganizationInsertInputDto = {
  schema: "Organization";
  doc: OrganizationInsertInput;
};

export type PermissionInsertInputDto = {
  schema: "Permission";
  doc: PermissionInsertInput;
};

export type RoleInsertInputDto = {
  schema: "Role";
  doc: RoleInsertInput;
};

export type SessionInsertInputDto = {
  schema: "Session";
  doc: SessionInsertInput;
};

export type SSOInsertInputDto = {
  schema: "SSO";
  doc: SSOInsertInput;
};

export type UserInsertInputDto = {
  schema: "User";
  doc: UserInsertInput;
};

export type InsertInput =
  | DeviceInsertInputDto
  | EmailServiceInsertInputDto
  | KeyInsertInputDto
  | OrganizationInsertInputDto
  | PermissionInsertInputDto
  | RoleInsertInputDto
  | SessionInsertInputDto
  | SSOInsertInputDto
  | UserInsertInputDto;
