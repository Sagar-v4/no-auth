import { nanoid } from "nanoid";
import { randomUUID } from "crypto";
import { HydratedDocument, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { USER_SCHEMA_NAME } from "@/app/users/entities/user.entity";
import { ORGANIZATION_SCHEMA_NAME } from "@/app/organizations/entities/organization.entity";
import { STATUS, STATUS_ENUM } from "@/lib/trpc/schemas/sso";

@Schema({
  timestamps: true,
})
export class SSO {
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
    enum: STATUS,
    required: true,
    default: STATUS_ENUM.enum.PREACTIVE,
  })
  status!: string;

  @Prop({ type: Object })
  metadata?: object;
}

export const SSO_SCHEMA_NAME = "SSO";

export const SSOSchema = SchemaFactory.createForClass(SSO);

export type SSODocument = HydratedDocument<SSO>;
