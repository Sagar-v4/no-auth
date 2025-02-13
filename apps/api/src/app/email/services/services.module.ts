import { Module } from "@nestjs/common";
import { EmailServicesService } from "@/app/email/services/services.service";
import { EmailServicesController } from "@/app/email/services/services.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import {
  EMAIL_SERVICE_SCHEMA_NAME,
  EmailServiceSchema,
} from "@/app/email/services/entities/service.entity";
import { EmailAppsService } from "../apps/apps.service";
import { EmailTemplatesService } from "../templates/templates.service";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import { EmailTemplatesModule } from "../templates/templates.module";
import { EmailAppsModule } from "../apps/apps.module";
import { OrganizationsModule } from "@/app/organizations/organizations.module";
import { EmailServicesProvidersModule } from "./providers/providers.module";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: EMAIL_SERVICE_SCHEMA_NAME, schema: EmailServiceSchema }],
      MONGOOSE_DB_CONNECTION.EMAIL,
    ),
    EmailAppsModule,
    EmailTemplatesModule,
    OrganizationsModule,
    EmailServicesProvidersModule,
  ],
  controllers: [EmailServicesController],
  providers: [EmailServicesService],
  exports: [EmailServicesService],
})
export class EmailServicesModule {}
