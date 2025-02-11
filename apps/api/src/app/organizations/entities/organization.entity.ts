import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Client } from "@/app/clients/entities/client.entity";
import { Form } from "@/app/forms/entities/form.entity";

export enum STATUS {
  ACTIVE = "Active",
  ARCHIVE = "Archive",
}

@Schema({
  timestamps: true,
})
export class Organization {
  @Prop({ type: String, required: true, unique: true })
  domainName!: string;

  @Prop({
    type: Types.ObjectId,
    ref: Client.name,
    required: true,
  })
  clientId!: string;

  @Prop({ type: String })
  logo: string | undefined;

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  description!: string;

  @Prop({ type: [Types.ObjectId], ref: Form.name })
  formIds!: string[];

  @Prop({ type: String, enum: STATUS, required: true, default: STATUS.ACTIVE })
  status!: string;

  @Prop({ type: Object })
  metadata: object | undefined;
}

export type OrganizationDocument = HydratedDocument<Organization>;

export const ORGANIZATION_SCHEMA_NAME: string = Organization.name;

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
