import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class ClientsService {
  private logger: Logger = new Logger(ClientsService.name);

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
