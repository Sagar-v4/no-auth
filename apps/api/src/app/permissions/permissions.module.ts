import { Module } from "@nestjs/common";

import { PermissionsV1Service } from "@/app/permissions/services/permissions.v1.service";
import { PermissionsV1Controller } from "@/app/permissions/controllers/permissions.v1.controller";
import { PermissionsV1Router } from "@/app/permissions/routers/permissions.v1.router";
import { BasicModule } from "@/app/basic/basic.module";

@Module({
  imports: [BasicModule],
  controllers: [PermissionsV1Controller],
  providers: [PermissionsV1Service, PermissionsV1Router],
  exports: [PermissionsV1Service],
})
export class PermissionsModule {}
