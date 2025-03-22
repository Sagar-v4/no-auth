import { Controller, Logger } from "@nestjs/common";
import { KeysV1Service } from "@/app/keys/services/keys.v1.service";

@Controller({
  path: "keys",
  version: "1",
})
export class KeysV1Controller {
  private logger: Logger = new Logger(KeysV1Controller.name);

  constructor(private readonly keysService: KeysV1Service) {
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
