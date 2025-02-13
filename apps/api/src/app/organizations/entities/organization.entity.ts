import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { CLIENT_SCHEMA_NAME } from "@/app/clients/entities/client.entity";

export enum STATUS {
  ACTIVE = "Active",
  ARCHIVED = "Archived",
}

@Schema({
  timestamps: true,
})
export class Organization {
  @Prop({ type: String, required: true, unique: true })
  domain!: string;

  @Prop({
    type: Types.ObjectId,
    ref: CLIENT_SCHEMA_NAME,
    required: true,
  })
  clientId!: string;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  description!: string;

  @Prop({ type: String, enum: STATUS, required: true, default: STATUS.ACTIVE })
  status!: string;

  @Prop({ type: Object })
  metadata?: object;
}

export const ORGANIZATION_SCHEMA_NAME: string = Organization.name;

export const OrganizationSchema = SchemaFactory.createForClass(Organization);

export type OrganizationDocument = HydratedDocument<Organization>;
