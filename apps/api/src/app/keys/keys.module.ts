import { Module } from "@nestjs/common";
import { KeysService } from "@/app/keys/keys.service";
import { KeysController } from "@/app/keys/keys.controller";

@Module({
  controllers: [KeysController],
  providers: [KeysService],
})
export class KeysModule {}
