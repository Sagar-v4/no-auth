import { Module } from "@nestjs/common";

import { DevicesV1Service } from "@/app/devices/services/devices.v1.service";
import { DevicesV1Controller } from "@/app/devices/controllers/devices.v1.controller";
import { DevicesV1Router } from "@/app/devices/routers/devices.v1.router";
import { BasicModule } from "@/app/basic/basic.module";

@Module({
  imports: [BasicModule],
  controllers: [DevicesV1Controller],
  providers: [DevicesV1Service, DevicesV1Router],
  exports: [DevicesV1Service],
})
export class DevicesModule {}
