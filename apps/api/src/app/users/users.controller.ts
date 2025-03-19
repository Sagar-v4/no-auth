import { Controller, Logger } from "@nestjs/common";
import { UsersService } from "@/app/users/users.service";

@Controller("users")
export class UsersController {
  private logger: Logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {
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
