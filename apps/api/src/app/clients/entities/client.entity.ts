import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

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
  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true, unique: true })
  email!: string;

  @Prop({ type: String, enum: LOGIN_METHODS, default: LOGIN_METHODS.EMAIL_OTP })
  loginMethod?: string;

  @Prop({ type: String, enum: STATUS, required: true, default: STATUS.ACTIVE })
  status!: string;

  @Prop({
    type: [String],
    enum: ROLES,
    required: true,
    default: [ROLES.CLIENT],
  })
  roles!: string[];

  @Prop({ type: Object })
  metadata?: object;
}

export const CLIENT_SCHEMA_NAME: string = Client.name;

export const ClientSchema = SchemaFactory.createForClass(Client);

export type ClientDocument = HydratedDocument<Client>;
