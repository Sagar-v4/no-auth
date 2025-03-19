import { Module } from "@nestjs/common";

import { UsersService } from "@/app/users/users.service";
import { UsersController } from "@/app/users/users.controller";
import { UsersRouter } from "@/app/users/users.router";
import { BasicModule } from "@/app/basic/basic.module";

@Module({
  imports: [BasicModule],
  controllers: [UsersController],
  providers: [UsersRouter, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
