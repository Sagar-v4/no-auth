import { EnvService } from "@/env/env.service";
import { Injectable, Type } from "@nestjs/common";
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from "@nestjs/mongoose";
import { Connection } from "mongoose";

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
        uri: uri,
        onConnectionCreate: (connection: Connection) => {
          connection.on("connected", () =>
            console.log(`🚀 connected: ${connectionName}`),
          );
          connection.on("open", () =>
            console.log(`🙌🏻 open: ${connectionName}`),
          );
          connection.on("disconnecting", () =>
            console.log(`🧨 disconnecting: ${connectionName}`),
          );
          connection.on("disconnected", () =>
            console.log(`💥 disconnected: ${connectionName}`),
          );
          connection.on("reconnected", () =>
            console.log(`✅ reconnected: ${connectionName}`),
          );
          return connection;
        },
      };
    }
  }

  return MongooseConfigService;
};
