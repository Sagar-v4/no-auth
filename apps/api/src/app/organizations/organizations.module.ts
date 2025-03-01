import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  ORGANIZATION_SCHEMA_NAME,
  OrganizationSchema,
} from "@/app/organizations/entities/organization.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import { OrganizationsController } from "@/app/organizations/organizations.controller";
import { OrganizationsRouter } from "@/app/organizations/organizations.router";
import {
  CLIENT_SCHEMA_NAME,
  ClientSchema,
} from "@/app/clients/entities/client.entity";
import { ClientsModule } from "@/app/clients/clients.module";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: ORGANIZATION_SCHEMA_NAME, schema: OrganizationSchema }],
      MONGOOSE_DB_CONNECTION.ORGANIZATION,
    ),
    MongooseModule.forFeature(
      [{ name: CLIENT_SCHEMA_NAME, schema: ClientSchema }],
      MONGOOSE_DB_CONNECTION.ORGANIZATION,
    ),
    ClientsModule,
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, OrganizationsRouter],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
