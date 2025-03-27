import { randomUUID } from "crypto";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

import {
  LOGIN_METHODS,
  LOGIN_METHODS_ENUM,
  STATUS,
  STATUS_ENUM,
} from "@/lib/trpc/schemas/v1/users";

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    type: Types.UUID,
    required: true,
    unique: true,
    default: () => randomUUID(),
  })
  uuid!: string;

  @Prop({ type: String })
  name?: string;

  @Prop({ type: String, required: true })
  email!: string;

  @Prop({
    type: Types.UUID,
  })
  organization_uuid?: string;

  @Prop({
    type: String,
    enum: LOGIN_METHODS,
    default: LOGIN_METHODS_ENUM.enum.OTP,
  })
  login_method!: string;

  @Prop({
    type: String,
    enum: STATUS,
    required: true,
    default: STATUS_ENUM.enum.ACTIVE,
  })
  status!: string;

  @Prop({
    type: [String],
    required: true,
  })
  roles!: string[];

  @Prop({ type: Object })
  metadata?: object;
}

export const USER_SCHEMA_NAME = "User";

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
