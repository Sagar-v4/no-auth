import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class RolesService {
  private logger: Logger = new Logger(RolesService.name);

  constructor() {
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
