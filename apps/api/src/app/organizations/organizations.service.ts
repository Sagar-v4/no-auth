import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class OrganizationsService {
  private logger: Logger = new Logger(OrganizationsService.name);

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
