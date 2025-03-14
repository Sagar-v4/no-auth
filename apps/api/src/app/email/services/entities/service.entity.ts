import {
  HydratedDocument,
  IndexDefinition,
  IndexOptions,
  Types,
} from "mongoose";
import { randomUUID } from "crypto";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DEVICE_SCHEMA_NAME } from "@/app/devices/entities/device.entity";
import {
  Client,
  CLIENT_SCHEMA_NAME,
} from "@/app/clients/entities/client.entity";
import {
  Clientele,
  CLIENTELE_SCHEMA_NAME,
} from "@/app/clienteles/entities/clientele.entity";

@Schema({
  timestamps: true,
})
export class Email_Service {
  @Prop({
    type: Types.UUID,
    required: true,
    unique: true,
    default: () => randomUUID(),
  })
  uuid!: string;

  @Prop({
    type: Types.ObjectId,
    refPath: "user_type",
    required: true,
  })
  user_id!: Client | Clientele;

  @Prop({
    type: String,
    required: true,
    enum: [CLIENT_SCHEMA_NAME, CLIENTELE_SCHEMA_NAME],
  })
  user_type!: string;

  @Prop({
    type: Types.ObjectId,
    ref: DEVICE_SCHEMA_NAME,
    required: true,
  })
  device_id!: string;

  @Prop({ type: Object })
  metadata?: object;
}

export const EMAIL_SERVICE_SCHEMA_NAME: string = Email_Service.name;

export const EmailServiceSchema = SchemaFactory.createForClass(Email_Service);

export type EmailServiceDocument = HydratedDocument<Email_Service>;

const INDEXES = [
  {
    drop: false,
    definition: {
      createdAt: 1,
    },
    options: {
      name: "Delete in 11 minutes",
      expireAfterSeconds: 11 * 60, // 11 minutes
      background: true,
    },
  },
  {
    drop: true,
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
