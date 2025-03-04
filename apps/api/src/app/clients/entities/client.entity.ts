import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { HydratedDocument, Types } from "mongoose";
import { z, ZodEnum, ZodNativeEnum } from "zod";

export enum LOGIN_METHODS {
  EMAIL_OTP = "Email OTP",
}

export enum STATUS {
  ACTIVE = "Active",
  BLOCKED = "Blocked",
  DELETED = "Deleted",
}

export enum ROLES {
  ADMIN = "Admin",
  CLIENT = "Client",
}

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

  @Prop({ type: String, enum: LOGIN_METHODS, default: LOGIN_METHODS.EMAIL_OTP })
  login_method?: string;

  @Prop({ type: String, enum: STATUS, required: true, default: STATUS.ACTIVE })
  status!: string;

  @Prop({
    type: Object,
    required: true,
    default: {
      [ROLES.CLIENT]: -1,
    },
  })
  roles!: {
    [role in ROLES]: number;
  };

  @Prop({ type: Object })
  metadata?: object;
}

export type ClientDocument = HydratedDocument<Client>;

export const CLIENT_SCHEMA_NAME: string = Client.name;

export const ClientSchema = SchemaFactory.createForClass(Client);
