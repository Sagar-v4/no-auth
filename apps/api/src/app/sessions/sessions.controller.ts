import { Controller } from "@nestjs/common";
import { SessionsService } from "@/app/sessions/sessions.service";

@Controller("sessions")
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}
}
