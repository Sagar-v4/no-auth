import { Controller, Logger } from "@nestjs/common";
import { KeysService } from "@/app/keys/keys.service";

@Controller("keys")
export class KeysController {
  private logger: Logger = new Logger(KeysController.name);

  constructor(private readonly keysService: KeysService) {
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
