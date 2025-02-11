import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Organization } from "@/app/organizations/entities/organization.entity";

export enum STATUS {
  ACTIVE = "Active",
  BLOCKED = "Blocked",
}

@Schema({
  timestamps: true,
})
export class Clientele {
  @Prop({ type: String, required: true, unique: true })
  uuid!: string;

  @Prop({
    type: Types.ObjectId,
    ref: Organization.name,
    required: true,
  })
  organizationId!: string;

  @Prop({ type: String, enum: STATUS, required: true, default: STATUS.ACTIVE })
  status!: string;

  @Prop({ type: Object })
  metadata: object | undefined;
}

export type ClienteleDocument = HydratedDocument<Clientele>;

export const CLIENTELE_SCHEMA_NAME: string = Clientele.name;

export const ClienteleSchema = SchemaFactory.createForClass(Clientele);
