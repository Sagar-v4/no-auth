import { Controller, Logger } from "@nestjs/common";
import { BasicService } from "@/app/basic/basic.service";

@Controller("basic")
export class BasicController {
  private logger: Logger = new Logger(BasicController.name);

  constructor(private readonly basicService: BasicService) {
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
