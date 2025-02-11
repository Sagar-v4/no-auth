import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Session } from "@/app/sessions/entities/session.entity";

export enum STATUS {
  ACTIVE = "Active",
  BLOCKED = "Blocked",
}

@Schema({
  timestamps: true,
})
export class Device {
  @Prop({ type: String, required: true, unique: true })
  uuid!: string;

  @Prop({
    type: [Types.ObjectId],
    ref: Session.name,
    required: true,
  })
  sessionIds!: string[];

  @Prop({ type: String, enum: STATUS, required: true, default: STATUS.ACTIVE })
  status!: string;

  @Prop({ type: Object })
  metadata: object | undefined;
}

export type DeviceDocument = HydratedDocument<Device>;

export const DEVICE_SCHEMA_NAME: string = Device.name;

export const DeviceSchema = SchemaFactory.createForClass(Device);
