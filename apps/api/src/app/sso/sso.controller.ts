import { Controller, Logger } from "@nestjs/common";
import { SSOService } from "@/app/sso/sso.service";

@Controller("sso")
export class SSOController {
  private logger: Logger = new Logger(SSOController.name);

  constructor(private readonly ssoService: SSOService) {
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
