import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { randomUUID } from "crypto";

import { CLIENT_SCHEMA_NAME } from "@/app/clients/entities/client.entity";
import { ORGANIZATION_SCHEMA_NAME } from "@/app/organizations/entities/organization.entity";
import { EMAIL_APP_SCHEMA_NAME } from "@/app/email/apps/entities/app.entity";

export enum TYPES {
  OTP = "OTP",
}

export enum STATUS {
  ACTIVE = "Active",
  ARCHIVED = "Archived",
}

@Schema({
  timestamps: true,
})
export class Form {
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
  clientId!: string;

  @Prop({
    type: Types.ObjectId,
    ref: ORGANIZATION_SCHEMA_NAME,
    required: true,
  })
  organizationId!: string;

  @Prop({
    type: Types.ObjectId,
    ref: EMAIL_APP_SCHEMA_NAME,
    required: true,
  })
  emailAppId!: string;

  @Prop({ type: String, enum: TYPES, required: true, default: TYPES.OTP })
  type?: string;

  @Prop({ type: String, required: true })
  title!: string;

  @Prop({ type: String })
  shortDescription?: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: Number, required: true, default: 0 })
  expiry?: number; // Ex: new Date().getTime()

  @Prop({ type: String, enum: STATUS, required: true, default: STATUS.ACTIVE })
  status!: string;

  @Prop({ type: Object })
  metadata?: object;
}

export const FORM_SCHEMA_NAME: string = Form.name;

export const FormSchema = SchemaFactory.createForClass(Form);

export type FormDocument = HydratedDocument<Form>;
