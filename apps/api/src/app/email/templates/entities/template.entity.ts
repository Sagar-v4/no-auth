import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { randomUUID } from "crypto";

import { CLIENT_SCHEMA_NAME } from "@/app/clients/entities/client.entity";
import { ORGANIZATION_SCHEMA_NAME } from "@/app/organizations/entities/organization.entity";

export enum STATUS {
  PERSONAL = "Personal",
  ORGANIZATIONAL = "Organizational",
  LIVE = "Live",
}

export enum TYPES {
  OTP = "OTP",
}

@Schema({
  timestamps: true,
})
export class Email_Template {
  @Prop({
    type: Types.UUID,
    required: true,
    unique: true,
    default: () => randomUUID(),
  })
  uuid!: string;

  @Prop({
    type: Types.ObjectId,
    ref: CLIENT_SCHEMA_NAME,
    required: true,
  })
  client_id!: string;

  @Prop({
    type: Types.ObjectId,
    ref: ORGANIZATION_SCHEMA_NAME,
    required: true,
  })
  organization_id!: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  name!: string;

  @Prop({
    type: String,
    required: true,
  })
  description!: string;

  @Prop({ type: String, enum: TYPES, required: true, default: TYPES.OTP })
  type!: string;

  @Prop({
    type: String,
    enum: STATUS,
    required: true,
    default: STATUS.PERSONAL,
  })
  status!: string;

  @Prop({ type: Object })
  metadata?: object;
}

export const EMAIL_TEMPLATE_SCHEMA_NAME: string = Email_Template.name;

export const EmailTemplateSchema = SchemaFactory.createForClass(Email_Template);

export type EmailTemplateDocument = HydratedDocument<Email_Template>;
