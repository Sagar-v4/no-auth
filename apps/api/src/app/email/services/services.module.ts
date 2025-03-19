import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  EMAIL_SERVICE_SCHEMA_NAME,
  EmailServiceSchema,
} from "@/app/email/services/entities/service.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { EmailServicesService } from "@/app/email/services/services.service";
import { EmailServicesController } from "@/app/email/services/services.controller";
import { EmailServicesRouter } from "@/app/email/services/services.router";
import { EnvModule } from "@/env/env.module";
import { BasicModule } from "@/app/basic/basic.module";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: EMAIL_SERVICE_SCHEMA_NAME, schema: EmailServiceSchema }],
      MONGOOSE_DB_CONNECTION.EMAIL_SERVICE,
    ),
    EnvModule,
    BasicModule,
  ],
  controllers: [EmailServicesController],
  providers: [EmailServicesService, EmailServicesRouter],
  exports: [EmailServicesService],
})
export class EmailServicesModule {}
