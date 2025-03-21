import { Module } from "@nestjs/common";

import { RolesV1Service } from "@/app/roles/services/roles.v1.service";
import { RolesV1Controller } from "@/app/roles/controllers/roles.v1.controller";
import { RolesV1Router } from "@/app/roles/routers/roles.v1.router";
import { BasicModule } from "@/app/basic/basic.module";

@Module({
  imports: [BasicModule],
  controllers: [RolesV1Controller],
  providers: [RolesV1Service, RolesV1Router],
  exports: [RolesV1Service],
})
export class RolesModule {}
