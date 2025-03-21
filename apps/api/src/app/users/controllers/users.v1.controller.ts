import { Controller, Logger } from "@nestjs/common";
import { UsersV1Service } from "@/app/users/services/users.v1.service";

@Controller({
  path: "users",
  version: "1",
})
export class UsersV1Controller {
  private logger: Logger = new Logger(UsersV1Controller.name);

  constructor(private readonly usersService: UsersV1Service) {
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
