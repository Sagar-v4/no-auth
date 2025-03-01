import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  CLIENTELE_SCHEMA_NAME,
  ClienteleSchema,
} from "@/app/clienteles/entities/clientele.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { ClientelesService } from "@/app/clienteles/clienteles.service";
import { ClientelesController } from "@/app/clienteles/clienteles.controller";
import { ClientelesRouter } from "@/app/clienteles/clienteles.router";
import {
  ORGANIZATION_SCHEMA_NAME,
  OrganizationSchema,
} from "@/app/organizations/entities/organization.entity";
import { OrganizationsModule } from "@/app/organizations/organizations.module";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: CLIENTELE_SCHEMA_NAME, schema: ClienteleSchema }],
      MONGOOSE_DB_CONNECTION.CLIENTELE,
    ),
    MongooseModule.forFeature(
      [{ name: ORGANIZATION_SCHEMA_NAME, schema: OrganizationSchema }],
      MONGOOSE_DB_CONNECTION.CLIENTELE,
    ),
    OrganizationsModule,
  ],
  controllers: [ClientelesController],
  providers: [ClientelesService, ClientelesRouter],
  exports: [ClientelesService],
})
export class ClientelesModule {}
