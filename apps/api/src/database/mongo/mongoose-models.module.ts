import { Global, Module } from "@nestjs/common";
import { ModelDefinition, MongooseModule } from "@nestjs/mongoose";

import { MONGOOSE_DB_SCHEMA } from "@/database/connections";

@Global()
@Module({
  imports: [
    ...Object.entries(MONGOOSE_DB_SCHEMA).map(([connectionName, models]) => {
      return MongooseModule.forFeature(
        models as ModelDefinition[],
        connectionName,
      );
    }),
  ],
  exports: [MongooseModule],
  providers: [MongooseModule],
})
export class MongooseModelsModule {}
