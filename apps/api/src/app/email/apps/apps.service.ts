import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";

import {
  EMAIL_APP_SCHEMA_NAME,
  EmailAppDocument,
  TYPES as EMAIL_APP_TYPES,
} from "@/app/email/apps/entities/app.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";

@Injectable()
export class EmailAppsService {
  private logger: Logger = new Logger(EmailAppsService.name);

  constructor(
    @InjectModel(EMAIL_APP_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.EMAIL)
    private readonly emailAppModel: Model<EmailAppDocument>,
  ) {
    try {
      this.logger.log({
        action: "Construct",
      });
    } catch (error) {
      this.logger.error({
        action: "Construct",
        error: error,
      });

      throw new Error("Constructor Failure!");
    }
  }

  // POST
  async insertOne(doc: {
    clientId: string;
    organizationId: string;
    name: string;
    description: string;
    type: EMAIL_APP_TYPES;
    metadata: { [field: string]: unknown };
  }): Promise<EmailAppDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          ...doc,
        },
      });

      const emailAppDocument: EmailAppDocument =
        await this.emailAppModel.insertOne(doc, {
          validateBeforeSave: true,
        });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          ...doc,
          documentKeys: Object.keys(emailAppDocument),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          ...doc,
          emailAppDocument,
        },
      });

      return emailAppDocument;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        metadata: {
          ...doc,
        },
      });

      throw new Error("Failed to insert email app document");
    }
  }

  // GET
  async findOne({
    filter,
    projection,
    conditions,
  }: {
    filter: { [field: string]: unknown };
    projection: { [field: string]: number };
    conditions?: { [field: string]: unknown };
  }): Promise<EmailAppDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOne.name,
        metadata: {
          filter,
          projection,
          conditions,
        },
      });

      const emailAppDocument: EmailAppDocument | null | undefined =
        await this.emailAppModel
          .findOne(filter, projection)
          .where(conditions ?? {});

      if (!emailAppDocument) {
        throw new Error("Email App Document not found");
      }

      this.logger.log({
        action: "Exit",
        method: this.findOne.name,
        metadata: {
          filter,
          projection,
          conditions,
          documentKeys: Object.keys(emailAppDocument),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.findOne.name,
        metadata: {
          filter,
          projection,
          conditions,
          emailAppDocument,
        },
      });

      return emailAppDocument;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findOne.name,
        error: error,
        metadata: {
          filter,
          projection,
          conditions,
        },
      });

      throw new Error("Failed to find email app document by filter");
    }
  }

  // PATCH
  async findOneAndUpdate({
    conditions,
    update,
  }: {
    conditions: { [field: string]: unknown };
    update: { [field: string]: unknown };
  }): Promise<EmailAppDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndUpdate.name,
        metadata: {
          conditions,
          update,
        },
      });

      const emailAppDocument: EmailAppDocument | null | undefined =
        await this.emailAppModel.findOneAndUpdate(conditions, update, {
          timestamps: true,
          new: true,
        });

      if (!emailAppDocument) {
        throw new Error("Email App Document not found");
      }

      this.logger.log({
        action: "Exit",
        method: this.findOneAndUpdate.name,
        metadata: {
          conditions,
          update,
          updatedKeys: Object.keys(update),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.findOneAndUpdate.name,
        metadata: {
          conditions,
          update,
          emailAppDocument,
        },
      });

      return emailAppDocument;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findOneAndUpdate.name,
        error: error,
        metadata: {
          conditions,
          update,
        },
      });

      throw new Error("Failed to update email app document by conditions");
    }
  }

  // PUT
  async findOneAndReplace({
    filter,
    replacement,
  }: {
    filter: { [field: string]: unknown };
    replacement: { [field: string]: unknown };
  }): Promise<EmailAppDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndReplace.name,
        metadata: {
          filter,
          replacement,
        },
      });

      const emailAppDocument: EmailAppDocument | null | undefined =
        await this.emailAppModel.findOneAndReplace(filter, replacement, {
          timestamps: true,
          new: true,
        });

      if (!emailAppDocument) {
        throw new Error("Email App Document not found");
      }

      this.logger.log({
        action: "Exit",
        method: this.findOneAndReplace.name,
        metadata: {
          filter,
          replacement,
          replacedKeys: Object.keys(replacement),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.findOneAndReplace.name,
        metadata: {
          filter,
          replacement,
          emailAppDocument,
        },
      });

      return emailAppDocument;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findOneAndReplace.name,
        error: error,
        metadata: {
          filter,
          replacement,
        },
      });

      throw new Error("Failed to replacement email app document by filter");
    }
  }

  // DELETE
  async findOneAndDelete({
    conditions,
  }: {
    conditions: { [field: string]: unknown };
  }): Promise<EmailAppDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndDelete.name,
        metadata: {
          conditions,
        },
      });

      const emailAppDocument: EmailAppDocument | null | undefined =
        await this.emailAppModel.findOneAndDelete(conditions);

      if (!emailAppDocument) {
        throw new Error("Email App Document not found");
      }

      this.logger.log({
        action: "Exit",
        method: this.findOneAndDelete.name,
        metadata: {
          conditions,
          documentKeys: Object.keys(emailAppDocument),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.findOneAndDelete.name,
        metadata: {
          conditions,
          emailAppDocument,
        },
      });

      return emailAppDocument;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findOneAndDelete.name,
        error: error,
        metadata: {
          conditions,
        },
      });

      throw new Error("Failed to delete email app document by conditions");
    }
  }
}
