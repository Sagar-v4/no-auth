import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { envConfig } from "@/env/env.config";
import { MongooseDatabaseModule } from "@/database/mongo/database.module";
import { MongooseModelsModule } from "@/database/mongo/mongoose-models.module";
import { EnvModule } from "@/env/env.module";
import { ClientsModule } from "@/app/clients/clients.module";
import { ClientelesModule } from "@/app/clienteles/clienteles.module";
import { OrganizationsModule } from "@/app/organizations/organizations.module";
import { EmailAppsModule } from "@/app/email/apps/apps.module";
import { EmailTemplatesModule } from "@/app/email/templates/templates.module";
import { EmailServicesModule } from "@/app/email/services/services.module";
import { FormsModule } from "@/app/forms/forms.module";
import { KeysModule } from "@/app/keys/keys.module";
import { DevicesModule } from "@/app/devices/devices.module";
import { SessionsModule } from "@/app/sessions/sessions.module";
import { TrpcModule } from "@/trpc/trpc.module";
import { SSOModule } from "@/app/sso/sso.module";
import { RolesModule } from "@/app/roles/roles.module";
import { PermissionsModule } from "@/app/permissions/permissions.module";
import { PermissionGroupsModule } from "@/app/permission-groups/permission-groups.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validate: envConfig,
      expandVariables: true,
    }),
    TrpcModule,
    EnvModule,
    ClientsModule,
    ClientelesModule,
    OrganizationsModule,
    EmailAppsModule,
    EmailTemplatesModule,
    EmailServicesModule,
    FormsModule,
    KeysModule,
    DevicesModule,
    SessionsModule,
    SSOModule,
    MongooseModelsModule,
    MongooseDatabaseModule,
    RolesModule,
    PermissionsModule,
    PermissionGroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
