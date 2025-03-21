import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { USER_SCHEMA_NAME } from "@/app/users/entities/user.entity";
import { randomUUID } from "crypto";
import { STATUS, STATUS_ENUM } from "@/lib/trpc/schemas/v1/organizations";

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
    ref: USER_SCHEMA_NAME,
    required: true,
  })
  user_id!: string;

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

export const ORGANIZATION_SCHEMA_NAME = "Organization";

export const OrganizationSchema = SchemaFactory.createForClass(Organization);

export type OrganizationDocument = HydratedDocument<Organization>;
