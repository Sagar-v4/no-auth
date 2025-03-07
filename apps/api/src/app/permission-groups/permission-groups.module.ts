import { Module } from "@nestjs/common";
import { PermissionGroupsService } from "@/app/permission-groups/permission-groups.service";
import { PermissionGroupsController } from "@/app/permission-groups/permission-groups.controller";
import { PermissionGroupsRouter } from "@/app/permission-groups/permission-groups.router";
import { MongooseModule } from "@nestjs/mongoose";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import {
  PERMISSION_GROUP_SCHEMA_NAME,
  PermissionGroupSchema,
} from "@/app/permission-groups/entities/permission-group.entity";
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
      [{ name: PERMISSION_GROUP_SCHEMA_NAME, schema: PermissionGroupSchema }],
      MONGOOSE_DB_CONNECTION.PERMISSION_GROUP,
    ),
    MongooseModule.forFeature(
      [{ name: ORGANIZATION_SCHEMA_NAME, schema: OrganizationSchema }],
      MONGOOSE_DB_CONNECTION.PERMISSION_GROUP,
    ),
    MongooseModule.forFeature(
      [{ name: CLIENT_SCHEMA_NAME, schema: ClientSchema }],
      MONGOOSE_DB_CONNECTION.PERMISSION_GROUP,
    ),
    ClientsModule,
    OrganizationsModule,
  ],
  controllers: [PermissionGroupsController],
  providers: [PermissionGroupsService, PermissionGroupsRouter],
  exports: [PermissionGroupsService],
})
export class PermissionGroupsModule {}
