import {
  Body,
  Controller,
  Logger,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
} from "@nestjs/common";
import { UUID } from "crypto";
import { zodToOpenAPI, ZodValidationPipe } from "nestjs-zod";

import {
  deviceInput,
  DeviceInput,
  deviceOutput,
} from "@/lib/trpc/schemas/v1/devices";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { DevicesV1Service } from "@/app/devices/services/devices.v1.service";

@Controller({
  path: "devices",
  version: "1",
})
export class DevicesV1Controller {
  private logger: Logger = new Logger(DevicesV1Controller.name);

  constructor(private readonly devicesService: DevicesV1Service) {
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

  @ApiBody({
    schema: zodToOpenAPI(deviceInput),
  })
  @ApiResponse({
    status: 201,
    schema: zodToOpenAPI(deviceOutput),
  })
  @Post(":id")
  async getDevices(
    @Param("id", ParseIntPipe) id: number,
    @Query("device", ParseUUIDPipe) device: UUID,
    @Body(new ZodValidationPipe(deviceInput))
    deviceId: DeviceInput,
  ) {
    return {
      id,
      device,
      deviceId,
    };
  }
}
