import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  DEVICE_SCHEMA_NAME,
  DeviceSchema,
} from "@/app/devices/entities/device.entity";
import { DevicesService } from "@/app/devices/devices.service";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { DevicesController } from "@/app/devices/devices.controller";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: DEVICE_SCHEMA_NAME, schema: DeviceSchema }],
      MONGOOSE_DB_CONNECTION.DEVICE,
    ),
  ],
  controllers: [DevicesController],
  providers: [DevicesService],
  exports: [DevicesService],
})
export class DevicesModule {}
