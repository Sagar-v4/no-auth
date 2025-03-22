import { Controller, Logger } from "@nestjs/common";
import { PermissionsV1Service } from "@/app/permissions/services/permissions.v1.service";

@Controller({
  path: "permissions",
  version: "1",
})
export class PermissionsV1Controller {
  private logger: Logger = new Logger(PermissionsV1Controller.name);

  constructor(private readonly permissionsService: PermissionsV1Service) {
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
