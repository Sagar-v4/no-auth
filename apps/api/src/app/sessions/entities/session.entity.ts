import { randomUUID } from "crypto";
import { HydratedDocument, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { DEVICE_SCHEMA_NAME } from "@/app/devices/entities/device.entity";
import { USER_SCHEMA_NAME } from "@/app/users/entities/user.entity";
import { STATUS, STATUS_ENUM } from "@/lib/trpc/schemas/v1/sessions";

@Schema({
  timestamps: true,
})
export class Session {
  @Prop({
    type: Types.UUID,
    required: true,
    unique: true,
    default: () => randomUUID(),
  })
  uuid!: string;

  @Prop({
    type: Types.ObjectId,
    refPath: USER_SCHEMA_NAME,
    required: true,
  })
  user_id!: string;

  @Prop({
    type: Types.ObjectId,
    ref: DEVICE_SCHEMA_NAME,
    required: true,
  })
  device_id!: string;

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

export const SESSION_SCHEMA_NAME = "Session";

export const SessionSchema = SchemaFactory.createForClass(Session);

export type SessionDocument = HydratedDocument<Session>;
