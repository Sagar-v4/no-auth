import { Module } from "@nestjs/common";

import { SessionsV1Service } from "@/app/sessions/services/sessions.v1.service";
import { SessionsV1Controller } from "@/app/sessions/controllers/sessions.v1.controller";
import { SessionsV1Router } from "@/app/sessions/routers/sessions.v1.router";
import { BasicModule } from "@/app/basic/basic.module";
import { AccessTokenService } from "@/app/sessions/jwt/access-token.service";
import { RefreshTokenService } from "@/app/sessions/jwt/refresh-token.service";
import { JwtModule } from "@nestjs/jwt";
import { EnvModule } from "@/env/env.module";

@Module({
  imports: [BasicModule, JwtModule, EnvModule],
  controllers: [SessionsV1Controller],
  providers: [
    SessionsV1Service,
    SessionsV1Router,
    AccessTokenService,
    RefreshTokenService,
  ],
  exports: [SessionsV1Service, AccessTokenService, RefreshTokenService],
})
export class SessionsModule {}
