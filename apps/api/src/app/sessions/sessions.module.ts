import { Module } from "@nestjs/common";
import { SessionsService } from "@/app/sessions/sessions.service";
import { SessionsController } from "@/app/sessions/sessions.controller";

@Module({
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
