import { Module } from "@nestjs/common";

import { UsersV1Service } from "@/app/users/services/users.v1.service";
import { UsersV1Controller } from "@/app/users/controllers/users.v1.controller";
import { UsersV1Router } from "@/app/users/routers/users.v1.router";
import { BasicModule } from "@/app/basic/basic.module";

@Module({
  imports: [BasicModule],
  controllers: [UsersV1Controller],
  providers: [UsersV1Router, UsersV1Service],
  exports: [UsersV1Service],
})
export class UsersModule {}
