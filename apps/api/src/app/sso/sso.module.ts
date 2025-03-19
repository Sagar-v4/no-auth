import { Module } from "@nestjs/common";

import { SSOService } from "@/app/sso/sso.service";
import { SSOController } from "@/app/sso/sso.controller";
import { SSORouter } from "@/app/sso/sso.router";
import { EmailServicesModule } from "@/app/email/services/services.module";
import { BasicModule } from "@/app/basic/basic.module";

@Module({
  imports: [EmailServicesModule, BasicModule],
  controllers: [SSOController],
  providers: [SSOService, SSORouter],
  exports: [SSOService],
})
export class SSOModule {}
