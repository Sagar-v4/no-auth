import { randomUUID } from "crypto";
import { HydratedDocument, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { CLIENT_SCHEMA_NAME } from "@/app/clients/entities/client.entity";
import { ORGANIZATION_SCHEMA_NAME } from "@/app/organizations/entities/organization.entity";
import { STATUS, STATUS_ENUM } from "@/lib/trpc/schemas/permission-groups";
import { PERMISSION_SCHEMA_NAME } from "@/app/permissions/entities/permission.entity";

@Schema({
  timestamps: true,
})
export class PermissionGroup {
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

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String })
  description?: string;

  @Prop({
    type: [Types.ObjectId],
    ref: PERMISSION_SCHEMA_NAME,
    required: true,
    default: [],
  })
  active_permission_ids!: string[];

  @Prop({
    type: [Types.ObjectId],
    ref: PERMISSION_SCHEMA_NAME,
    required: true,
    default: [],
  })
  inactive_permission_ids!: string[];

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

export const PERMISSION_GROUP_SCHEMA_NAME: string = PermissionGroup.name;

export const PermissionGroupSchema =
  SchemaFactory.createForClass(PermissionGroup);

export type PermissionGroupDocument = HydratedDocument<PermissionGroup>;
