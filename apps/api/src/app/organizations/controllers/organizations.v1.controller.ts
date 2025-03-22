import { Controller, Logger } from "@nestjs/common";
import { OrganizationsV1Service } from "@/app/organizations/services/organizations.v1.service";

@Controller({
  path: "organizations",
  version: "1",
})
export class OrganizationsV1Controller {
  private logger: Logger = new Logger(OrganizationsV1Controller.name);

  constructor(private readonly organizationsService: OrganizationsV1Service) {
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
