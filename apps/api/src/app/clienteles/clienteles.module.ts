import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  CLIENTELE_SCHEMA_NAME,
  ClienteleSchema,
} from "@/app/clienteles/entities/clientele.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { ClientelesService } from "@/app/clienteles/clienteles.service";
import { ClientelesController } from "@/app/clienteles/clienteles.controller";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: CLIENTELE_SCHEMA_NAME, schema: ClienteleSchema }],
      MONGOOSE_DB_CONNECTION.CLIENTELE,
    ),
  ],
  controllers: [ClientelesController],
  providers: [ClientelesService],
  exports: [ClientelesService],
})
export class ClientelesModule {}
