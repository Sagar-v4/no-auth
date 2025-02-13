import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { randomUUID } from "crypto";

import { CLIENT_SCHEMA_NAME } from "@/app/clients/entities/client.entity";
import { ORGANIZATION_SCHEMA_NAME } from "@/app/organizations/entities/organization.entity";

export enum STATUS {
  ACTIVE = "Active",
  BLOCKED = "Blocked",
}

export enum TYPES {
  NODE_MAILER = "Node Mailer",
}

@Schema({
  timestamps: true,
})
export class EmailApp {
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

  @Prop({ type: String, enum: TYPES, required: true })
  type!: string;

  @Prop({
    type: String,
    enum: STATUS,
    required: true,
    default: STATUS.ACTIVE,
  })
  status!: string;

  @Prop({ type: Object })
  metadata?: object;
}

export const EMAIL_APP_SCHEMA_NAME: string = EmailApp.name;

export const EmailAppSchema = SchemaFactory.createForClass(EmailApp);

export type EmailAppDocument = HydratedDocument<EmailApp>;
