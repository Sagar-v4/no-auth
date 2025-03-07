import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { RolesService } from "@/app/roles/roles.service";
import { RolesController } from "@/app/roles/roles.controller";
import { ROLE_SCHEMA_NAME, RoleSchema } from "@/app/roles/entities/role.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import {
  ORGANIZATION_SCHEMA_NAME,
  OrganizationSchema,
} from "@/app/organizations/entities/organization.entity";
import {
  CLIENT_SCHEMA_NAME,
  ClientSchema,
} from "@/app/clients/entities/client.entity";
import { ClientsModule } from "@/app/clients/clients.module";
import { OrganizationsModule } from "@/app/organizations/organizations.module";
import { RolesRouter } from "@/app/roles/roles.router";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: ROLE_SCHEMA_NAME, schema: RoleSchema }],
      MONGOOSE_DB_CONNECTION.ROLE,
    ),
    MongooseModule.forFeature(
      [{ name: ORGANIZATION_SCHEMA_NAME, schema: OrganizationSchema }],
      MONGOOSE_DB_CONNECTION.ROLE,
    ),
    MongooseModule.forFeature(
      [{ name: CLIENT_SCHEMA_NAME, schema: ClientSchema }],
      MONGOOSE_DB_CONNECTION.ROLE,
    ),
    ClientsModule,
    OrganizationsModule,
  ],
  controllers: [RolesController],
  providers: [RolesService, RolesRouter],
  exports: [RolesService],
})
export class RolesModule {}
