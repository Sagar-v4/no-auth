import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class ClientelesService {
  private logger: Logger = new Logger(ClientelesService.name);

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
