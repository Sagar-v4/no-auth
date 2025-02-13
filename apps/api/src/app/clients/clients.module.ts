import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  CLIENT_SCHEMA_NAME,
  ClientSchema,
} from "@/app/clients/entities/client.entity";
import { ClientsService } from "@/app/clients/clients.service";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { ClientsController } from "@/app/clients/clients.controller";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: CLIENT_SCHEMA_NAME, schema: ClientSchema }],
      MONGOOSE_DB_CONNECTION.CLIENT,
    ),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
