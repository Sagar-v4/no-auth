import { ClienteleDocument } from "@/app/clienteles/entities/clientele.entity";
import { ClientDocument } from "@/app/clients/entities/client.entity";
import { DeviceDocument } from "@/app/devices/entities/device.entity";
import { EmailServiceDocument } from "@/app/email/services/entities/service.entity";
import { KeyDocument } from "@/app/keys/entities/key.entity";
import { OrganizationDocument } from "@/app/organizations/entities/organization.entity";
import { PermissionDocument } from "@/app/permissions/entities/permission.entity";
import { RoleDocument } from "@/app/roles/entities/role.entity";
import { SessionDocument } from "@/app/sessions/entities/session.entity";
import { SSODocument } from "@/app/sso/entities/sso.entity";
import { SCHEMA_NAME_ENUM } from "@/app/basic/enums/schema-name.enum";

export type Documents = {
  [SCHEMA_NAME_ENUM.Enum.Clientele]: ClienteleDocument;
  [SCHEMA_NAME_ENUM.Enum.Client]: ClientDocument;
  [SCHEMA_NAME_ENUM.Enum.Device]: DeviceDocument;
  [SCHEMA_NAME_ENUM.Enum.Email_Service]: EmailServiceDocument;
  [SCHEMA_NAME_ENUM.Enum.Key]: KeyDocument;
  [SCHEMA_NAME_ENUM.Enum.Organization]: OrganizationDocument;
  [SCHEMA_NAME_ENUM.Enum.Permission]: PermissionDocument;
  [SCHEMA_NAME_ENUM.Enum.Role]: RoleDocument;
  [SCHEMA_NAME_ENUM.Enum.SSO]: SSODocument;
  [SCHEMA_NAME_ENUM.Enum.Session]: SessionDocument;
};
