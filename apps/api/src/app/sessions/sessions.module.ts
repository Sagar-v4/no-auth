import { Module } from "@nestjs/common";

import { SessionsService } from "@/app/sessions/sessions.service";
import { SessionsController } from "@/app/sessions/sessions.controller";
import { SessionsRouter } from "@/app/sessions/sessions.router";
import { BasicModule } from "@/app/basic/basic.module";

@Module({
  imports: [BasicModule],
  controllers: [SessionsController],
  providers: [SessionsService, SessionsRouter],
  exports: [SessionsService],
})
export class SessionsModule {}
