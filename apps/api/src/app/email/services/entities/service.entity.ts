import {
  HydratedDocument,
  IndexDefinition,
  IndexOptions,
  Types,
} from "mongoose";
import { randomUUID } from "crypto";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { FORM_SCHEMA_NAME } from "@/app/forms/entities/form.entity";
import { EMAIL_APP_SCHEMA_NAME } from "@/app/email/apps/entities/app.entity";
import { ORGANIZATION_SCHEMA_NAME } from "@/app/organizations/entities/organization.entity";

@Schema({
  timestamps: true,
})
export class EmailService {
  @Prop({
    type: Types.UUID,
    required: true,
    unique: true,
    default: () => randomUUID(),
  })
  uuid!: string;

  @Prop({
    type: Types.ObjectId,
    ref: FORM_SCHEMA_NAME,
    required: true,
  })
  formId!: string;

  @Prop({
    type: Types.ObjectId,
    ref: EMAIL_APP_SCHEMA_NAME,
    required: true,
  })
  emailAppId!: string;

  @Prop({
    type: Types.ObjectId,
    ref: ORGANIZATION_SCHEMA_NAME,
    required: true,
  })
  organizationId!: string;

  @Prop({ type: Object })
  metadata?: object;
}

export const EMAIL_SERVICE_SCHEMA_NAME: string = EmailService.name;

export const EmailServiceSchema = SchemaFactory.createForClass(EmailService);

export type EmailServiceDocument = HydratedDocument<EmailService>;

const INDEXES = [
  {
    drop: false,
    definition: {
      createdAt: 1,
    },
    options: {
      name: "Delete in 10 minutes",
      expireAfterSeconds: 600, // 10 minutes
      background: true,
    },
  },
  {
    drop: false,
    definition: {
      uuid: "hashed",
      createdAt: 1,
    },
    options: {
      name: "UUID index with createdAt",
      background: false,
    },
  },
];

INDEXES.forEach((document) => {
  if (document.drop) {
    EmailServiceSchema.removeIndex(document.options.name);
  } else {
    EmailServiceSchema.index(
      document.definition as IndexDefinition,
      document.options as IndexOptions,
    );
  }
});
