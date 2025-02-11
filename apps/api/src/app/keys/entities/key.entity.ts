import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Client } from "@/app/clients/entities/client.entity";
import { Organization } from "@/app/organizations/entities/organization.entity";

export enum STATUS {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

@Schema({
  timestamps: true,
})
export class Key {
  @Prop({ type: String, required: true, unique: true })
  key!: string;

  @Prop({
    type: Types.ObjectId,
    ref: Client.name,
    required: true,
  })
  clientId!: string;

  @Prop({
    type: Types.ObjectId,
    ref: Organization.name,
    required: true,
  })
  organizationId!: string;

  @Prop({
    type: String,
    required: true,
  })
  name!: string;

  @Prop({
    type: String,
    required: true,
  })
  description!: string;

  @Prop({ type: String, enum: STATUS, required: true, default: STATUS.ACTIVE })
  status!: string;

  @Prop({ type: Object })
  metadata: object | undefined;
}

export type KeyDocument = HydratedDocument<Key>;

export const KEY_SCHEMA_NAME: string = Key.name;

export const KeySchema = SchemaFactory.createForClass(Key);
