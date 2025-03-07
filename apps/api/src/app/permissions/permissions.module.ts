import { Module } from "@nestjs/common";
import { PermissionsService } from "@/app/permissions/permissions.service";
import { PermissionsController } from "@/app/permissions/permissions.controller";
import { PermissionsRouter } from "@/app/permissions/permissions.router";
import { MongooseModule } from "@nestjs/mongoose";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import {
  PERMISSION_SCHEMA_NAME,
  PermissionSchema,
} from "@/app/permissions/entities/permission.entity";
import { ClientsModule } from "@/app/clients/clients.module";
import {
  CLIENT_SCHEMA_NAME,
  ClientSchema,
} from "@/app/clients/entities/client.entity";
import {
  ORGANIZATION_SCHEMA_NAME,
  OrganizationSchema,
} from "@/app/organizations/entities/organization.entity";
import { OrganizationsModule } from "@/app/organizations/organizations.module";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: PERMISSION_SCHEMA_NAME, schema: PermissionSchema }],
      MONGOOSE_DB_CONNECTION.PERMISSION,
    ),
    MongooseModule.forFeature(
      [{ name: ORGANIZATION_SCHEMA_NAME, schema: OrganizationSchema }],
      MONGOOSE_DB_CONNECTION.PERMISSION,
    ),
    MongooseModule.forFeature(
      [{ name: CLIENT_SCHEMA_NAME, schema: ClientSchema }],
      MONGOOSE_DB_CONNECTION.PERMISSION,
    ),
    ClientsModule,
    OrganizationsModule,
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionsRouter],
  exports: [PermissionsService],
})
export class PermissionsModule {}
