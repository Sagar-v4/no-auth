import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { SSOService } from "@/app/sso/sso.service";
import { SSOController } from "@/app/sso/sso.controller";
import { SSO_SCHEMA_NAME, SSOSchema } from "@/app/sso/entities/sso.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { SSORouter } from "@/app/sso/sso.router";
import {
  CLIENT_SCHEMA_NAME,
  ClientSchema,
} from "@/app/clients/entities/client.entity";
import {
  ORGANIZATION_SCHEMA_NAME,
  OrganizationSchema,
} from "@/app/organizations/entities/organization.entity";
import { ClientsModule } from "@/app/clients/clients.module";
import { OrganizationsModule } from "@/app/organizations/organizations.module";
import { EmailServicesModule } from "@/app/email/services/services.module";
import { DevicesModule } from "@/app/devices/devices.module";
import { ClientelesModule } from "@/app/clienteles/clienteles.module";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: SSO_SCHEMA_NAME, schema: SSOSchema }],
      MONGOOSE_DB_CONNECTION.SSO,
    ),
    MongooseModule.forFeature(
      [{ name: CLIENT_SCHEMA_NAME, schema: ClientSchema }],
      MONGOOSE_DB_CONNECTION.SSO,
    ),
    MongooseModule.forFeature(
      [{ name: ORGANIZATION_SCHEMA_NAME, schema: OrganizationSchema }],
      MONGOOSE_DB_CONNECTION.SSO,
    ),
    ClientsModule,
    OrganizationsModule,
    EmailServicesModule,
    DevicesModule,
    ClientelesModule,
  ],
  controllers: [SSOController],
  providers: [SSOService, SSORouter],
  exports: [SSOService],
})
export class SSOModule {}
