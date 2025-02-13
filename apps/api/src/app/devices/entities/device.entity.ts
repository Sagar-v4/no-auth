import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { randomUUID } from "crypto";

import { SESSION_SCHEMA_NAME } from "@/app/sessions/entities/session.entity";

export enum STATUS {
  ACTIVE = "Active",
  BLOCKED = "Blocked",
}

@Schema({
  timestamps: true,
})
export class Device {
  @Prop({
    type: Types.UUID,
    required: true,
    unique: true,
    default: () => randomUUID(),
  })
  uuid!: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: SESSION_SCHEMA_NAME }],
  })
  sessionIds?: string[];

  @Prop({ type: String, enum: STATUS, required: true, default: STATUS.ACTIVE })
  status!: string;

  @Prop({ type: Object })
  metadata?: object;
}

export const DEVICE_SCHEMA_NAME: string = Device.name;

export const DeviceSchema = SchemaFactory.createForClass(Device);

export type DeviceDocument = HydratedDocument<Device>;
