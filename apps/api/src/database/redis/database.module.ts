import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";

import { EnvService } from "@/env/env.service";
import { EnvModule } from "@/env/env.module";
import { createRedisConfigServiceClass } from "@/database/redis/config.service";
// import { RedisService } from "@/nestjs/db/redis/config.service";

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [EnvModule],
      inject: [EnvService],
      useClass: createRedisConfigServiceClass(),
    }),
  ],

  // exports: [RedisService],
  // providers: [RedisService],
})
export class RedisDatabaseModule {}
