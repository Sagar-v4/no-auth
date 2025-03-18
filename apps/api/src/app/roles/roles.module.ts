import { Module } from "@nestjs/common";

import { RolesService } from "@/app/roles/roles.service";
import { RolesController } from "@/app/roles/roles.controller";
import { RolesRouter } from "@/app/roles/roles.router";
import { BasicModule } from "@/app/basic/basic.module";

@Module({
  imports: [BasicModule],
  controllers: [RolesController],
  providers: [RolesService, RolesRouter],
  exports: [RolesService],
})
export class RolesModule {}
