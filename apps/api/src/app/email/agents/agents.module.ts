import { Module } from "@nestjs/common";
import { AgentsService } from "@/app/email/agents/agents.service";
import { AgentsController } from "@/app/email/agents/agents.controller";

@Module({
  controllers: [AgentsController],
  providers: [AgentsService],
})
export class AgentsModule {}
