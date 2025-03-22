import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ZodValidationPipe } from "nestjs-zod";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";

import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { envConfig } from "@/env/env.config";
import { RedisDatabaseModule } from "@/database/redis/database.module";
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
    RedisDatabaseModule,
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
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
