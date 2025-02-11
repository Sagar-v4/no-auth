import { Controller } from "@nestjs/common";
import { AgentsService } from "@/app/email/agents/agents.service";

@Controller("agents")
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}
}
