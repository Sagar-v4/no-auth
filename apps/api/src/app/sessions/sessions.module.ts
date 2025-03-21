import { Module } from "@nestjs/common";

import { SessionsV1Service } from "@/app/sessions/services/sessions.v1.service";
import { SessionsV1Controller } from "@/app/sessions/controllers/sessions.v1.controller";
import { SessionsV1Router } from "@/app/sessions/routers/sessions.v1.router";
import { BasicModule } from "@/app/basic/basic.module";

@Module({
  imports: [BasicModule],
  controllers: [SessionsV1Controller],
  providers: [SessionsV1Service, SessionsV1Router],
  exports: [SessionsV1Service],
})
export class SessionsModule {}
