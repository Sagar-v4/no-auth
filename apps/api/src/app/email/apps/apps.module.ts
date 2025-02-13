import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  EMAIL_APP_SCHEMA_NAME,
  EmailAppSchema,
} from "@/app/email/apps/entities/app.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { EmailAppsService } from "@/app/email/apps/apps.service";
import { EmailAppsController } from "@/app/email/apps/apps.controller";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: EMAIL_APP_SCHEMA_NAME, schema: EmailAppSchema }],
      MONGOOSE_DB_CONNECTION.EMAIL,
    ),
  ],
  controllers: [EmailAppsController],
  providers: [EmailAppsService],
  exports: [EmailAppsService],
})
export class EmailAppsModule {}
