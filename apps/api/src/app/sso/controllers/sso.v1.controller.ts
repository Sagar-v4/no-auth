import { Controller, Logger } from "@nestjs/common";
import { SSOV1Service } from "@/app/sso/services/sso.v1.service";

@Controller({
  path: "sso",
  version: "1",
})
export class SSOV1Controller {
  private logger: Logger = new Logger(SSOV1Controller.name);

  constructor(private readonly ssoService: SSOV1Service) {
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
