import { Controller, Logger } from "@nestjs/common";
import { PermissionsService } from "@/app/permissions/permissions.service";

@Controller("permissions")
export class PermissionsController {
  private logger: Logger = new Logger(PermissionsController.name);

  constructor(private readonly permissionsService: PermissionsService) {
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
