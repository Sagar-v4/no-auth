import { Controller, Logger } from "@nestjs/common";
import { SessionsService } from "@/app/sessions/sessions.service";

@Controller("sessions")
export class SessionsController {
  private logger: Logger = new Logger(SessionsController.name);

  constructor(private readonly sessionsService: SessionsService) {
    try {
      this.logger.log({
        action: "Construct",
      });
    } catch (error) {
      this.logger.error({
        action: "Construct",
        error: error,
      });

      throw new Error("Constructor Failure!");
    }
  }
}
