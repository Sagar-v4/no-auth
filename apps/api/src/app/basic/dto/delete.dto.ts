import { RootFilterQuery } from "mongoose";

export type DeleteInput<SchemaNameEnum> = {
  schema: SchemaNameEnum;
  filter: RootFilterQuery<any>;
};
