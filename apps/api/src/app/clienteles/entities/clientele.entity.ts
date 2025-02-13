import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { randomUUID } from "crypto";

import { ORGANIZATION_SCHEMA_NAME } from "@/app/organizations/entities/organization.entity";

export enum STATUS {
  ACTIVE = "Active",
  BLOCKED = "Blocked",
}

@Schema({
  timestamps: true,
})
export class Clientele {
  @Prop({
    type: Types.UUID,
    required: true,
    unique: true,
    default: () => randomUUID(),
  })
  uuid!: string;

  @Prop({
    type: Types.ObjectId,
    ref: ORGANIZATION_SCHEMA_NAME,
    required: true,
  })
  organizationId!: string;

  @Prop({ type: String, enum: STATUS, required: true, default: STATUS.ACTIVE })
  status!: string;

  @Prop({ type: Object })
  metadata?: object;
}

export const CLIENTELE_SCHEMA_NAME: string = Clientele.name;

export const ClienteleSchema = SchemaFactory.createForClass(Clientele);

export type ClienteleDocument = HydratedDocument<Clientele>;
