import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export enum LOGIN_METHODS {
  OTP = "Email OTP",
  ML = "Email Magic Link",
  EPW = "Email Password",
  UPW = "UserId Password",
}

export enum STATUS {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
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

  @Prop({ type: String, required: true, unique: true })
  userId!: string;

  @Prop({ type: String, enum: LOGIN_METHODS })
  loginMethod!: string;

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
  metadata: object | undefined;
}

export type ClientDocument = HydratedDocument<Client>;

export const CLIENT_SCHEMA_NAME: string = Client.name;

export const ClientSchema = SchemaFactory.createForClass(Client);
