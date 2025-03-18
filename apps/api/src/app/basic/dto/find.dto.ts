import { PopulateOptions, RootFilterQuery } from "mongoose";

export type FindInput<SchemaNameEnum> = {
  schema: SchemaNameEnum;
  filter: RootFilterQuery<any>;
  select: string[];
  populate: PopulateOptions | (PopulateOptions | string)[];
};
