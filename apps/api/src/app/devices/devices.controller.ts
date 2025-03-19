import { Controller, Logger } from "@nestjs/common";
import { DevicesService } from "@/app/devices/devices.service";

@Controller("devices")
export class DevicesController {
  private logger: Logger = new Logger(DevicesController.name);

  constructor(private readonly devicesService: DevicesService) {
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
