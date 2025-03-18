import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  CLIENT_SCHEMA_NAME,
  ClientSchema,
} from "@/app/clients/entities/client.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { BasicService } from "@/app/basic/basic.service";
import { BasicController } from "@/app/basic/basic.controller";
import {
  CLIENTELE_SCHEMA_NAME,
  ClienteleSchema,
} from "@/app/clienteles/entities/clientele.entity";
import {
  DEVICE_SCHEMA_NAME,
  DeviceSchema,
} from "@/app/devices/entities/device.entity";
import {
  EMAIL_SERVICE_SCHEMA_NAME,
  EmailServiceSchema,
} from "@/app/email/services/entities/service.entity";
import { KEY_SCHEMA_NAME, KeySchema } from "@/app/keys/entities/key.entity";
import {
  ORGANIZATION_SCHEMA_NAME,
  OrganizationSchema,
} from "@/app/organizations/entities/organization.entity";
import {
  PERMISSION_SCHEMA_NAME,
  PermissionSchema,
} from "@/app/permissions/entities/permission.entity";
import { ROLE_SCHEMA_NAME, RoleSchema } from "@/app/roles/entities/role.entity";
import {
  SESSION_SCHEMA_NAME,
  SessionSchema,
} from "@/app/sessions/entities/session.entity";
import { SSO_SCHEMA_NAME, SSOSchema } from "@/app/sso/entities/sso.entity";

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: CLIENT_SCHEMA_NAME, schema: ClientSchema },
        { name: CLIENTELE_SCHEMA_NAME, schema: ClienteleSchema },
        { name: DEVICE_SCHEMA_NAME, schema: DeviceSchema },
        { name: EMAIL_SERVICE_SCHEMA_NAME, schema: EmailServiceSchema },
        { name: KEY_SCHEMA_NAME, schema: KeySchema },
        { name: ORGANIZATION_SCHEMA_NAME, schema: OrganizationSchema },
        { name: PERMISSION_SCHEMA_NAME, schema: PermissionSchema },
        { name: ROLE_SCHEMA_NAME, schema: RoleSchema },
        { name: SESSION_SCHEMA_NAME, schema: SessionSchema },
        { name: SSO_SCHEMA_NAME, schema: SSOSchema },
      ],
      MONGOOSE_DB_CONNECTION.BASIC,
    ),
  ],
  controllers: [BasicController],
  providers: [BasicService],
  exports: [BasicService],
})
export class BasicModule {}
