import { randomUUID } from "crypto";
import { HydratedDocument, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { DEVICE_SCHEMA_NAME } from "@/app/devices/entities/device.entity";
import {
  Client,
  CLIENT_SCHEMA_NAME,
} from "@/app/clients/entities/client.entity";
import {
  Clientele,
  CLIENTELE_SCHEMA_NAME,
} from "@/app/clienteles/entities/clientele.entity";
import { STATUS, STATUS_ENUM } from "@/lib/trpc/schemas/sessions";

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
    refPath: "user_type",
    required: true,
  })
  user_id!: Client | Clientele;

  @Prop({
    type: String,
    required: true,
    enum: [CLIENT_SCHEMA_NAME, CLIENTELE_SCHEMA_NAME],
  })
  user_type!: string;

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

export const SESSION_SCHEMA_NAME: string = Session.name;

export const SessionSchema = SchemaFactory.createForClass(Session);

export type SessionDocument = HydratedDocument<Session>;
