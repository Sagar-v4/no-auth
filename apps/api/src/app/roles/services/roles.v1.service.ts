import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class RolesV1Service {
  private logger: Logger = new Logger(RolesV1Service.name);

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
