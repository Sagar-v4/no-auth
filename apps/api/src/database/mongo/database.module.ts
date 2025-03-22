import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { createMongooseConfigServiceClass } from "@/database/mongo/config.service";
import { EnvModule } from "@/env/env.module";

@Module({
  imports: [
    ...Object.values(MONGOOSE_DB_CONNECTION).map((connectionName: string) => {
      return MongooseModule.forRootAsync({
        imports: [EnvModule],
        connectionName: connectionName,
        useClass: createMongooseConfigServiceClass(connectionName),
      });
    }),
  ],
  exports: [MongooseModule],
  providers: [MongooseModule],
})
export class MongooseDatabaseModule {}
