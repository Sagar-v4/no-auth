import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  EMAIL_SERVICE_SCHEMA_NAME,
  EmailServiceSchema,
} from "@/app/email/services/entities/service.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { EmailServicesService } from "@/app/email/services/services.service";
import { EmailServicesController } from "@/app/email/services/services.controller";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: EMAIL_SERVICE_SCHEMA_NAME, schema: EmailServiceSchema }],
      MONGOOSE_DB_CONNECTION.EMAIL,
    ),
  ],
  controllers: [EmailServicesController],
  providers: [EmailServicesService],
  exports: [EmailServicesService],
})
export class EmailServicesModule {}
