import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Client } from "@/app/clients/entities/client.entity";
import { Organization } from "@/app/organizations/entities/organization.entity";

export enum STATUS {
  ACTIVE = "Active",
  BLOCKED = "Blocked",
}

export enum TYPE {
  SMTP = "SMTP",
}

@Schema({
  timestamps: true,
})
export class Agent {
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
    default: STATUS.ACTIVE,
  })
  status!: string;

  @Prop({ type: Object })
  metadata: object | undefined;
}

export type AgentDocument = HydratedDocument<Agent>;

export const AGENT_SCHEMA_NAME: string = Agent.name;

export const AgentSchema = SchemaFactory.createForClass(Agent);
