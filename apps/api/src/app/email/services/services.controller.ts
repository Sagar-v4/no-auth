import { Controller, Logger } from "@nestjs/common";
import { EmailServicesService } from "@/app/email/services/services.service";

@Controller("services")
export class EmailServicesController {
  private logger: Logger = new Logger(EmailServicesController.name);

  constructor(private readonly emailServicesService: EmailServicesService) {
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
