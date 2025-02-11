import { Controller } from "@nestjs/common";
import { DevicesService } from "@/app/devices/devices.service";

@Controller("devices")
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}
}
