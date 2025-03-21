import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class DevicesV1Service {
  private logger: Logger = new Logger(DevicesV1Service.name);

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
