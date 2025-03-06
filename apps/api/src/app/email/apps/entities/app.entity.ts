import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { randomUUID } from "crypto";

import { CLIENT_SCHEMA_NAME } from "@/app/clients/entities/client.entity";
import { ORGANIZATION_SCHEMA_NAME } from "@/app/organizations/entities/organization.entity";
import {
  STATUS,
  STATUS_ENUM,
  TYPES,
  TYPES_ENUM,
} from "@/lib/trpc/schemas/email/apps";

@Schema({
  timestamps: true,
})
export class Email_App {
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
    required: true,
  })
  name!: string;

  @Prop({
    type: String,
  })
  description?: string;

  @Prop({
    type: String,
    enum: TYPES,
    default: TYPES_ENUM.enum.NODE_MAILER,
    required: true,
  })
  type!: string;

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

export const EMAIL_APP_SCHEMA_NAME: string = Email_App.name;

export const EmailAppSchema = SchemaFactory.createForClass(Email_App);

export type EmailAppDocument = HydratedDocument<Email_App>;
