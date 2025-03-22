import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class UsersV1Service {
  private logger: Logger = new Logger(UsersV1Service.name);

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
