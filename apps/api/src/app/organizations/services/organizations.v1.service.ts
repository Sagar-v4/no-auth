import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class OrganizationsV1Service {
  private logger: Logger = new Logger(OrganizationsV1Service.name);

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
