import { randomUUID } from "crypto";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

import {
  LOGIN_METHODS,
  LOGIN_METHODS_ENUM,
  ROLES,
  ROLES_ENUM,
  STATUS,
  STATUS_ENUM,
} from "@/lib/trpc/schemas/clients";

@Schema({
  timestamps: true,
})
export class Client {
  @Prop({
    type: Types.UUID,
    required: true,
    unique: true,
    default: () => randomUUID(),
  })
  uuid!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true, unique: true })
  email!: string;

  @Prop({
    type: String,
    enum: LOGIN_METHODS,
    default: LOGIN_METHODS_ENUM.enum.OTP,
  })
  login_method!: string;

  @Prop({
    type: String,
    enum: STATUS,
    required: true,
    default: STATUS_ENUM.enum.ACTIVE,
  })
  status!: string;

  @Prop({
    type: [String],
    enum: ROLES,
    required: true,
    default: [ROLES_ENUM.enum.CLIENT],
  })
  roles!: string[];

  @Prop({ type: Object })
  metadata?: object;
}

export const CLIENT_SCHEMA_NAME = "Client";

export type ClientDocument = HydratedDocument<Client>;

export const ClientSchema = SchemaFactory.createForClass(Client);
