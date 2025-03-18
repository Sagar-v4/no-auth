import { z } from "zod";

import { CLIENT_SCHEMA_NAME } from "@/app/clients/entities/client.entity";
import { CLIENTELE_SCHEMA_NAME } from "@/app/clienteles/entities/clientele.entity";
import { DEVICE_SCHEMA_NAME } from "@/app/devices/entities/device.entity";
import { EMAIL_SERVICE_SCHEMA_NAME } from "@/app/email/services/entities/service.entity";
import { KEY_SCHEMA_NAME } from "@/app/keys/entities/key.entity";
import { ORGANIZATION_SCHEMA_NAME } from "@/app/organizations/entities/organization.entity";
import { PERMISSION_SCHEMA_NAME } from "@/app/permissions/entities/permission.entity";
import { ROLE_SCHEMA_NAME } from "@/app/roles/entities/role.entity";
import { SESSION_SCHEMA_NAME } from "@/app/sessions/entities/session.entity";
import { SSO_SCHEMA_NAME } from "@/app/sso/entities/sso.entity";

export const SCHEMA_NAME = [
  CLIENT_SCHEMA_NAME,
  CLIENTELE_SCHEMA_NAME,
  DEVICE_SCHEMA_NAME,
  EMAIL_SERVICE_SCHEMA_NAME,
  KEY_SCHEMA_NAME,
  ORGANIZATION_SCHEMA_NAME,
  PERMISSION_SCHEMA_NAME,
  ROLE_SCHEMA_NAME,
  SESSION_SCHEMA_NAME,
  SSO_SCHEMA_NAME,
] as const;
export const SCHEMA_NAME_ENUM = z.enum(SCHEMA_NAME);
export type SchemaNameEnum = z.infer<typeof SCHEMA_NAME_ENUM>;
