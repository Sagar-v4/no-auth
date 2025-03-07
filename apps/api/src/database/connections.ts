import { ModelDefinition } from "@nestjs/mongoose";

export enum REDIS_DB_CONNECTION {
  MAIN = "MAIN_CONN",
}

export interface MongooseDbSchema {
  connectionName: string;
  models: ModelDefinition[];
}

export enum MONGOOSE_DB_CONNECTION {
  SSO = "SSO",
  KEY = "KEY",
  ROLE = "ROLE",
  FORM = "FORM",
  EMAIL = "EMAIL",
  CLIENT = "CLIENT",
  DEVICE = "DEVICE",
  SESSIOIN = "SESSIOIN",
  CLIENTELE = "CLIENTELE",
  PERMISSION = "PERMISSION",
  ORGANIZATION = "ORGANIZATION",
  PERMISSION_GROUP = "PERMISSION_GROUP",
}

export const MONGOOSE_DB_SCHEMA = {
  // [MONGOOSE_DB_CONNECTION.MAIN]: [
  //   {
  //     // default collection name
  //     name: "USER_SCHEMA_NAME",
  //     // Schema instance
  //     schema: "UserSchema",
  //     // name of the collection [override default name]
  //     collection: "all_users",
  //   },
  // ],
};
