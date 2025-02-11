import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Client } from "@/app/clients/entities/client.entity";
import { Organization } from "@/app/organizations/entities/organization.entity";

export enum STATUS {
  PERSONAL = "Personal",
  ORGANIZATIONAL = "Organizational",
  LIVE = "Live",
}

export enum TYPE {
  PERSONAL = "Personal",
  ORGANIZATIONAL = "Organizational",
  LIVE = "Live",
}

@Schema({
  timestamps: true,
})
export class Template {
  @Prop({ type: String, required: true, unique: true })
  uuid!: string;

  @Prop({
    type: Types.ObjectId,
    ref: Client.name,
    required: true,
  })
  clientId!: string;

  @Prop({
    type: Types.ObjectId,
    ref: Organization.name,
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

  @Prop({ type: String, enum: TYPE, required: true })
  type!: string;

  @Prop({
    type: String,
    enum: STATUS,
    required: true,
    default: STATUS.PERSONAL,
  })
  status!: string;

  @Prop({ type: Object })
  metadata: object | undefined;
}

export type TemplateDocument = HydratedDocument<Template>;

export const TEMPLATE_SCHEMA_NAME: string = Template.name;

export const TemplateSchema = SchemaFactory.createForClass(Template);
