import { Controller, Logger } from "@nestjs/common";
import { OrganizationsService } from "@/app/organizations/organizations.service";

@Controller("organizations")
export class OrganizationsController {
  private logger: Logger = new Logger(OrganizationsController.name);

  constructor(private readonly organizationsService: OrganizationsService) {
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
