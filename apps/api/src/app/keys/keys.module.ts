import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { KeysService } from "@/app/keys/keys.service";
import { KeysController } from "@/app/keys/keys.controller";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { KEY_SCHEMA_NAME, KeySchema } from "@/app/keys/entities/key.entity";
import { KeysRouter } from "@/app/keys/keys.router";
import {
  ORGANIZATION_SCHEMA_NAME,
  OrganizationSchema,
} from "@/app/organizations/entities/organization.entity";
import { ClientsModule } from "@/app/clients/clients.module";
import {
  CLIENT_SCHEMA_NAME,
  ClientSchema,
} from "@/app/clients/entities/client.entity";
import { OrganizationsModule } from "@/app/organizations/organizations.module";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: KEY_SCHEMA_NAME, schema: KeySchema }],
      MONGOOSE_DB_CONNECTION.KEY,
    ),
    MongooseModule.forFeature(
      [{ name: ORGANIZATION_SCHEMA_NAME, schema: OrganizationSchema }],
      MONGOOSE_DB_CONNECTION.KEY,
    ),
    MongooseModule.forFeature(
      [{ name: CLIENT_SCHEMA_NAME, schema: ClientSchema }],
      MONGOOSE_DB_CONNECTION.KEY,
    ),
    ClientsModule,
    OrganizationsModule,
  ],
  controllers: [KeysController],
  providers: [KeysService, KeysRouter],
  exports: [KeysService],
})
export class KeysModule {}
