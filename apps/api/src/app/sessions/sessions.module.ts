import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  SESSION_SCHEMA_NAME,
  SessionSchema,
} from "@/app/sessions/entities/session.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { SessionsService } from "@/app/sessions/sessions.service";
import { SessionsController } from "@/app/sessions/sessions.controller";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: SESSION_SCHEMA_NAME, schema: SessionSchema }],
      MONGOOSE_DB_CONNECTION.SESSIOIN,
    ),
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
