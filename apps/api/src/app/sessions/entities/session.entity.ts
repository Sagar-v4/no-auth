import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { randomUUID } from "crypto";

// import { Client } from "@/app/clients/entities/client.entity";
// import { Clientele } from "@/app/clienteles/entities/clientele.entity";
import { DEVICE_SCHEMA_NAME } from "@/app/devices/entities/device.entity";

export enum STATUS {
  ACTIVE = "Active",
  EXPIRED = "Expired",
}

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

  // @Prop({
  //   type: Types.ObjectId,
  //   // ref: "userType",
  //   required: true,
  // })
  // userId!: string;

  // @Prop({
  //   type: String,
  //   required: true,
  //   enum: [Client.name, Clientele.name],
  // })
  // userType!: string;

  @Prop({
    type: Types.ObjectId,
    ref: DEVICE_SCHEMA_NAME,
    required: true,
  })
  deviceId!: string;

  @Prop({ type: String, enum: STATUS, required: true, default: STATUS.ACTIVE })
  status!: string;

  @Prop({ type: Object })
  metadata?: object;
}

export const SESSION_SCHEMA_NAME: string = Session.name;

export const SessionSchema = SchemaFactory.createForClass(Session);

export type SessionDocument = HydratedDocument<Session>;
