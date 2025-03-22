import { Injectable, Type } from "@nestjs/common";
import { createKeyv, Keyv } from "@keyv/redis";
import { CacheOptions, CacheOptionsFactory } from "@nestjs/cache-manager";
import { EnvService } from "@/env/env.service";
import { CacheableMemory } from "cacheable";

export const createRedisConfigServiceClass = (): Type<CacheOptionsFactory> => {
  @Injectable()
  class RedisConfigService implements CacheOptionsFactory {
    constructor(private readonly envService: EnvService) {}

    createCacheOptions():
      | CacheOptions<Record<string, any>>
      | Promise<CacheOptions<Record<string, any>>> {
      const uri = this.envService.get("REDIS_URI");

      return {
        // ttl: 1000 * 60 * 5,
        stores: [
          new Keyv({
            store: new CacheableMemory({
              ttl: 90000,
              lruSize: 5000,
              checkInterval: 5000,
            }),
          }),
          createKeyv({
            url: uri,
          })
            .on("error", () => {
              console.error("Failed to connect to Redis");
            })
            .on("connect", () => {
              console.error("connect to connect to Redis");
            }),
        ],
      };
    }
  }

  return RedisConfigService;
};
