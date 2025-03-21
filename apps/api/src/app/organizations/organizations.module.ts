import { Module } from "@nestjs/common";

import { OrganizationsV1Service } from "@/app/organizations/services/organizations.v1.service";
import { OrganizationsV1Controller } from "@/app/organizations/controllers/organizations.v1.controller";
import { OrganizationsV1Router } from "@/app/organizations/routers/organizations.v1.router";
import { BasicModule } from "@/app/basic/basic.module";

@Module({
  imports: [BasicModule],
  controllers: [OrganizationsV1Controller],
  providers: [OrganizationsV1Service, OrganizationsV1Router],
  exports: [OrganizationsV1Service],
})
export class OrganizationsModule {}
