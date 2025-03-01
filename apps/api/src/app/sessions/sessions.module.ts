import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  SESSION_SCHEMA_NAME,
  SessionSchema,
} from "@/app/sessions/entities/session.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { SessionsService } from "@/app/sessions/sessions.service";
import { SessionsController } from "@/app/sessions/sessions.controller";
import { SessionsRouter } from "@/app/sessions/sessions.router";
import {
  CLIENT_SCHEMA_NAME,
  ClientSchema,
} from "@/app/clients/entities/client.entity";
import {
  CLIENTELE_SCHEMA_NAME,
  ClienteleSchema,
} from "@/app/clienteles/entities/clientele.entity";
import {
  DEVICE_SCHEMA_NAME,
  DeviceSchema,
} from "@/app/devices/entities/device.entity";
import { ClientsModule } from "@/app/clients/clients.module";
import { ClientelesModule } from "@/app/clienteles/clienteles.module";
import { DevicesModule } from "@/app/devices/devices.module";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: SESSION_SCHEMA_NAME, schema: SessionSchema }],
      MONGOOSE_DB_CONNECTION.SESSIOIN,
    ),
    MongooseModule.forFeature(
      [{ name: CLIENT_SCHEMA_NAME, schema: ClientSchema }],
      MONGOOSE_DB_CONNECTION.SESSIOIN,
    ),
    MongooseModule.forFeature(
      [{ name: CLIENTELE_SCHEMA_NAME, schema: ClienteleSchema }],
      MONGOOSE_DB_CONNECTION.SESSIOIN,
    ),
    MongooseModule.forFeature(
      [{ name: DEVICE_SCHEMA_NAME, schema: DeviceSchema }],
      MONGOOSE_DB_CONNECTION.SESSIOIN,
    ),
    ClientsModule,
    ClientelesModule,
    DevicesModule,
  ],
  controllers: [SessionsController],
  providers: [SessionsService, SessionsRouter],
  exports: [SessionsService],
})
export class SessionsModule {}
