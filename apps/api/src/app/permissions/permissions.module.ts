import { Module } from "@nestjs/common";

import { PermissionsService } from "@/app/permissions/permissions.service";
import { PermissionsController } from "@/app/permissions/permissions.controller";
import { PermissionsRouter } from "@/app/permissions/permissions.router";
import { BasicModule } from "@/app/basic/basic.module";

@Module({
  imports: [BasicModule],
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionsRouter],
  exports: [PermissionsService],
})
export class PermissionsModule {}
