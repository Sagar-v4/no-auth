import { Module } from "@nestjs/common";

import { KeysService } from "@/app/keys/keys.service";
import { KeysController } from "@/app/keys/keys.controller";
import { KeysRouter } from "@/app/keys/keys.router";
import { BasicModule } from "@/app/basic/basic.module";

@Module({
  imports: [BasicModule],
  controllers: [KeysController],
  providers: [KeysService, KeysRouter],
  exports: [KeysService],
})
export class KeysModule {}
