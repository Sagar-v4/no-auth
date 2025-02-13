import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  ORGANIZATION_SCHEMA_NAME,
  OrganizationSchema,
} from "@/app/organizations/entities/organization.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import { OrganizationsController } from "@/app/organizations/organizations.controller";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: ORGANIZATION_SCHEMA_NAME, schema: OrganizationSchema }],
      MONGOOSE_DB_CONNECTION.ORGANIZATION,
    ),
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
