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
import { BasicModule } from "@/app/basic/basic.module";

@Module({
  imports: [EmailServicesModule, BasicModule],
  controllers: [SSOController],
  providers: [SSOService, SSORouter],
  exports: [SSOService],
})
export class SSOModule {}
