import { RootFilterQuery } from "mongoose";

export type GetIdsInput<SchemaNameEnum> = {
  schema: SchemaNameEnum;
  filter: RootFilterQuery<any>;
};
