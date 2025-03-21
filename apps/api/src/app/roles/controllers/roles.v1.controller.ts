import { Controller, Logger } from "@nestjs/common";
import { RolesV1Service } from "@/app/roles/services/roles.v1.service";

@Controller({
  path: "roles",
  version: "1",
})
export class RolesV1Controller {
  private logger: Logger = new Logger(RolesV1Controller.name);

  constructor(private readonly rolesService: RolesV1Service) {
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
