import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { FormsService } from "@/app/forms/forms.service";
import { FormsController } from "@/app/forms/forms.controller";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { FORM_SCHEMA_NAME, FormSchema } from "@/app/forms/entities/form.entity";
import { FormRouter } from "@/app/forms/forms.router";
import { EmailAppsModule } from "@/app/email/apps/apps.module";
import { ClientsModule } from "@/app/clients/clients.module";
import {
  CLIENT_SCHEMA_NAME,
  ClientSchema,
} from "@/app/clients/entities/client.entity";
import {
  EMAIL_APP_SCHEMA_NAME,
  EmailAppSchema,
} from "@/app/email/apps/entities/app.entity";
import {
  ORGANIZATION_SCHEMA_NAME,
  OrganizationSchema,
} from "@/app/organizations/entities/organization.entity";
import { OrganizationsModule } from "@/app/organizations/organizations.module";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: FORM_SCHEMA_NAME, schema: FormSchema }],
      MONGOOSE_DB_CONNECTION.FORM,
    ),
    MongooseModule.forFeature(
      [{ name: CLIENT_SCHEMA_NAME, schema: ClientSchema }],
      MONGOOSE_DB_CONNECTION.FORM,
    ),
    MongooseModule.forFeature(
      [{ name: ORGANIZATION_SCHEMA_NAME, schema: OrganizationSchema }],
      MONGOOSE_DB_CONNECTION.FORM,
    ),
    MongooseModule.forFeature(
      [{ name: EMAIL_APP_SCHEMA_NAME, schema: EmailAppSchema }],
      MONGOOSE_DB_CONNECTION.FORM,
    ),
    ClientsModule,
    OrganizationsModule,
    EmailAppsModule,
  ],
  controllers: [FormsController],
  providers: [FormsService, FormRouter],
  exports: [FormsService],
})
export class FormsModule {}
