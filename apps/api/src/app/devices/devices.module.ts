import { Module } from "@nestjs/common";

import { DevicesService } from "@/app/devices/devices.service";
import { DevicesController } from "@/app/devices/devices.controller";
import { DevicesRouter } from "@/app/devices/devices.router";
import { BasicModule } from "@/app/basic/basic.module";

@Module({
  imports: [BasicModule],
  controllers: [DevicesController],
  providers: [DevicesService, DevicesRouter],
  exports: [DevicesService],
})
export class DevicesModule {}
