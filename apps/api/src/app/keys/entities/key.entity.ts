import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { randomUUID } from "crypto";

import { CLIENT_SCHEMA_NAME } from "@/app/clients/entities/client.entity";
import { ORGANIZATION_SCHEMA_NAME } from "@/app/organizations/entities/organization.entity";
import { STATUS, STATUS_ENUM } from "@/lib/trpc/schemas/keys";

@Schema({
  timestamps: true,
})
export class Key {
  @Prop({
    type: Types.UUID,
    required: true,
    unique: true,
    default: () => randomUUID(),
  })
  uuid!: string;

  @Prop({
    type: Types.ObjectId,
    ref: CLIENT_SCHEMA_NAME,
    required: true,
  })
  client_id!: string;

  @Prop({
    type: Types.ObjectId,
    ref: ORGANIZATION_SCHEMA_NAME,
    required: true,
  })
  organization_id!: string;

  @Prop({
    type: String,
    required: true,
  })
  name!: string;

  @Prop({
    type: String,
  })
  description?: string;

  @Prop({ type: Number, required: true, default: -1 })
  expiry!: number; // Ex: new Date().getTime()

  @Prop({
    type: String,
    enum: STATUS,
    required: true,
    default: STATUS_ENUM.enum.ACTIVE,
  })
  status!: string;

  @Prop({ type: Object })
  metadata?: object;
}

export const KEY_SCHEMA_NAME: string = Key.name;

export const KeySchema = SchemaFactory.createForClass(Key);

export type KeyDocument = HydratedDocument<Key>;
