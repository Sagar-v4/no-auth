import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  EMAIL_APP_SCHEMA_NAME,
  EmailAppSchema,
} from "@/app/email/apps/entities/app.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { EmailAppsService } from "@/app/email/apps/apps.service";
import { EmailAppsController } from "@/app/email/apps/apps.controller";
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
import { EmailAppRouter } from "@/app/email/apps/apps.router";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: EMAIL_APP_SCHEMA_NAME, schema: EmailAppSchema }],
      MONGOOSE_DB_CONNECTION.EMAIL_APP,
    ),
    MongooseModule.forFeature(
      [{ name: CLIENT_SCHEMA_NAME, schema: ClientSchema }],
      MONGOOSE_DB_CONNECTION.EMAIL_APP,
    ),
    MongooseModule.forFeature(
      [{ name: ORGANIZATION_SCHEMA_NAME, schema: OrganizationSchema }],
      MONGOOSE_DB_CONNECTION.EMAIL_APP,
    ),
    ClientsModule,
    OrganizationsModule,
  ],
  controllers: [EmailAppsController],
  providers: [EmailAppsService, EmailAppRouter],
  exports: [EmailAppsService],
})
export class EmailAppsModule {}
