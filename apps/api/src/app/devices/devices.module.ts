import { Module } from "@nestjs/common";
import { DevicesService } from "@/app/devices/devices.service";
import { DevicesController } from "@/app/devices/devices.controller";

@Module({
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
