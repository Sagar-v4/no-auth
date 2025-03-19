import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { envConfig } from "@/env/env.config";
import { MongooseDatabaseModule } from "@/database/mongo/database.module";
import { MongooseModelsModule } from "@/database/mongo/mongoose-models.module";
import { EnvModule } from "@/env/env.module";
import { OrganizationsModule } from "@/app/organizations/organizations.module";
import { EmailServicesModule } from "@/app/email/services/services.module";
import { KeysModule } from "@/app/keys/keys.module";
import { DevicesModule } from "@/app/devices/devices.module";
import { SessionsModule } from "@/app/sessions/sessions.module";
import { TrpcModule } from "@/trpc/trpc.module";
import { SSOModule } from "@/app/sso/sso.module";
import { RolesModule } from "@/app/roles/roles.module";
import { PermissionsModule } from "@/app/permissions/permissions.module";
import { BasicModule } from "@/app/basic/basic.module";
import { UsersModule } from "@/app/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validate: envConfig,
      expandVariables: true,
    }),
    EnvModule,
    MongooseModelsModule,
    MongooseDatabaseModule,
    TrpcModule,
    BasicModule,
    DevicesModule,
    EmailServicesModule,
    KeysModule,
    OrganizationsModule,
    PermissionsModule,
    RolesModule,
    SessionsModule,
    SSOModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
