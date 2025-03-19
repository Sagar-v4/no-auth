import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class UsersService {
  private logger: Logger = new Logger(UsersService.name);

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
