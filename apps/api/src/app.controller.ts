import { Controller, Get, Logger } from "@nestjs/common";
import { AppService } from "@/app.service";

@Controller()
export class AppController {
  private logger: Logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {
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

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("ping")
  ping(): string {
    return "pong";
  }
}
