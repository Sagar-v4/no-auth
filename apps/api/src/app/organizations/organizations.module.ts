import { Module } from "@nestjs/common";

import { OrganizationsService } from "@/app/organizations/organizations.service";
import { OrganizationsController } from "@/app/organizations/organizations.controller";
import { OrganizationsRouter } from "@/app/organizations/organizations.router";
import { BasicModule } from "@/app/basic/basic.module";

@Module({
  imports: [BasicModule],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, OrganizationsRouter],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
