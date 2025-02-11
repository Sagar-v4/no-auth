import { Module } from "@nestjs/common";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import { OrganizationsController } from "@/app/organizations/organizations.controller";

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
