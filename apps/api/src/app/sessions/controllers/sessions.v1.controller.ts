import { Controller, Logger } from "@nestjs/common";
import { SessionsV1Service } from "@/app/sessions/services/sessions.v1.service";

@Controller({
  path: "sessions",
  version: "1",
})
export class SessionsV1Controller {
  private logger: Logger = new Logger(SessionsV1Controller.name);

  constructor(private readonly sessionsService: SessionsV1Service) {
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
