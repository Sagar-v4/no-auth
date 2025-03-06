import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import {
  Client,
  CLIENT_SCHEMA_NAME,
} from "@/app/clients/entities/client.entity";
import { randomUUID } from "crypto";
import { STATUS, STATUS_ENUM } from "@/lib/trpc/schemas/organizations";
@Schema({
  timestamps: true,
})
export class Organization {
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
    auto: true,
    select: true,
  })
  client_id!: Client;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String })
  description?: string;

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

export const ORGANIZATION_SCHEMA_NAME: string = Organization.name;

export const OrganizationSchema = SchemaFactory.createForClass(Organization);

export type OrganizationDocument = HydratedDocument<Organization>;
