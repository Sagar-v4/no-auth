import { Controller, Logger } from "@nestjs/common";
import { RolesService } from "@/app/roles/roles.service";

@Controller("roles")
export class RolesController {
  private logger: Logger = new Logger(RolesController.name);

  constructor(private readonly rolesService: RolesService) {
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
