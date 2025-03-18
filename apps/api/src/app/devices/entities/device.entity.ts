import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { randomUUID } from "crypto";
import { STATUS, STATUS_ENUM } from "@/lib/trpc/schemas/devices";

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
    type: String,
    enum: STATUS,
    required: true,
    default: STATUS_ENUM.enum.ACTIVE,
  })
  status!: string;

  @Prop({ type: Object })
  metadata?: object;
}

export const DEVICE_SCHEMA_NAME = "Device";

export const DeviceSchema = SchemaFactory.createForClass(Device);

export type DeviceDocument = HydratedDocument<Device>;
