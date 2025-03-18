import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class DevicesService {
  private logger: Logger = new Logger(DevicesService.name);

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
