import { Module } from "@nestjs/common";

import { KeysV1Service } from "@/app/keys/services/keys.v1.service";
import { KeysV1Controller } from "@/app/keys/controllers/keys.v1.controller";
import { KeysV1Router } from "@/app/keys/routers/keys.v1.router";
import { BasicModule } from "@/app/basic/basic.module";

@Module({
  imports: [BasicModule],
  controllers: [KeysV1Controller],
  providers: [KeysV1Service, KeysV1Router],
  exports: [KeysV1Service],
})
export class KeysModule {}
