import { nanoid } from "nanoid";
import { randomUUID } from "crypto";
import { HydratedDocument, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { USER_SCHEMA_NAME } from "@/app/users/entities/user.entity";
import { ORGANIZATION_SCHEMA_NAME } from "@/app/organizations/entities/organization.entity";
import { STATUS, STATUS_ENUM } from "@/lib/trpc/schemas/v1/keys";

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
    type: String,
    required: true,
    unique: true,
    default: () => nanoid(),
  })
  secret!: string;

  @Prop({
    type: Types.ObjectId,
    ref: USER_SCHEMA_NAME,
    required: true,
  })
  user_id!: string;

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
    default: STATUS_ENUM.Enum.ACTIVE,
  })
  status!: string;

  @Prop({ type: Object })
  metadata?: object;
}

export const KEY_SCHEMA_NAME = "Key";

export const KeySchema = SchemaFactory.createForClass(Key);

export type KeyDocument = HydratedDocument<Key>;
