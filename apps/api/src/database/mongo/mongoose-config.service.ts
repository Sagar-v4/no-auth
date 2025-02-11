import { EnvService } from "@/env/env.service";
import { Injectable, Type } from "@nestjs/common";
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from "@nestjs/mongoose";

export const createMongooseConfigServiceClass = (
  connectionName: string,
): Type<MongooseOptionsFactory> => {
  @Injectable()
  class MongooseConfigService implements MongooseOptionsFactory {
    constructor(private readonly envService: EnvService) {}

    createMongooseOptions():
      | MongooseModuleOptions
      | Promise<MongooseModuleOptions> {
      const uri: string = this.envService.get("MONGO_URI");

      return {
        uri,
      };
    }
  }

  return MongooseConfigService;
};
