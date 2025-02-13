import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { KeysService } from "@/app/keys/keys.service";
import { KeysController } from "@/app/keys/keys.controller";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { KEY_SCHEMA_NAME, KeySchema } from "@/app/keys/entities/key.entity";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: KEY_SCHEMA_NAME, schema: KeySchema }],
      MONGOOSE_DB_CONNECTION.KEY,
    ),
  ],
  controllers: [KeysController],
  providers: [KeysService],
  exports: [KeysService],
})
export class KeysModule {}
