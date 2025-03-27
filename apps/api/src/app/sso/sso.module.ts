import { Module } from "@nestjs/common";

import { SSOV1Service } from "@/app/sso/services/sso.v1.service";
import { SSOV1Controller } from "@/app/sso/controllers/sso.v1.controller";
import { SSOV1Router } from "@/app/sso/routers/sso.v1.router";
import { EmailServicesModule } from "@/app/email/services/services.module";
import { BasicModule } from "@/app/basic/basic.module";
import { EnvModule } from "@/env/env.module";

@Module({
  imports: [EmailServicesModule, BasicModule, EnvModule],
  controllers: [SSOV1Controller],
  providers: [SSOV1Service, SSOV1Router],
  exports: [SSOV1Service],
})
export class SSOModule {}
