import { Controller, Logger } from "@nestjs/common";
import { EmailServicesV1Service } from "@/app/email/services/services/services.v1.service";

@Controller({
  path: "email/services",
  version: "1",
})
export class EmailServicesV1Controller {
  private logger: Logger = new Logger(EmailServicesV1Controller.name);

  constructor(private readonly emailServicesService: EmailServicesV1Service) {
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
