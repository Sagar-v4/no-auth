import { PopulateOptions, RootFilterQuery, UpdateQuery } from "mongoose";

export type UpdateInput<SchemaNameEnum> = {
  schema: SchemaNameEnum;
  filter: RootFilterQuery<any>;
  update: UpdateQuery<any>;
  select: string[];
  populate: PopulateOptions | (PopulateOptions | string)[];
};
