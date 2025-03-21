import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  EMAIL_SERVICE_SCHEMA_NAME,
  EmailServiceSchema,
} from "@/app/email/services/entities/service.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { EnvModule } from "@/env/env.module";
import { BasicModule } from "@/app/basic/basic.module";
import { EmailServicesV1Controller } from "@/app/email/services/controllers/services.v1.controller";
import { EmailServicesV1Service } from "@/app/email/services/services/services.v1.service";
import { EmailServicesV1Router } from "@/app/email/services/routers/services.v1.router";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: EMAIL_SERVICE_SCHEMA_NAME, schema: EmailServiceSchema }],
      MONGOOSE_DB_CONNECTION.EMAIL_SERVICE,
    ),
    EnvModule,
    BasicModule,
  ],
  controllers: [EmailServicesV1Controller],
  providers: [EmailServicesV1Service, EmailServicesV1Router],
  exports: [EmailServicesV1Service],
})
export class EmailServicesModule {}
