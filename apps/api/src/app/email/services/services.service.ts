import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";

import {
  EMAIL_SERVICE_SCHEMA_NAME,
  EmailServiceDocument,
} from "@/app/email/services/entities/service.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";

@Injectable()
export class EmailServicesService {
  private logger: Logger = new Logger(EmailServicesService.name);

  constructor(
    @InjectModel(EMAIL_SERVICE_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.EMAIL)
    private readonly emailServiceModel: Model<EmailServiceDocument>,
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
    formId: string;
    emailAppId: string;
    organizationId: string;
    metadata: { [field: string]: unknown };
  }): Promise<EmailServiceDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          ...doc,
        },
      });

      const emailServiceDocument: EmailServiceDocument =
        await this.emailServiceModel.insertOne(doc, {
          validateBeforeSave: true,
        });

      if (!emailServiceDocument) {
        throw new Error("Email Service Document not found");
      }

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          ...doc,
          documentKeys: Object.keys(emailServiceDocument),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          ...doc,
          emailServiceDocument,
        },
      });

      return emailServiceDocument;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        metadata: {
          ...doc,
        },
      });

      throw new Error("Failed to insert email service document");
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
  }): Promise<EmailServiceDocument> {
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

      const emailServiceDocument: EmailServiceDocument | null | undefined =
        await this.emailServiceModel
          .findOne(filter, projection)
          .where(conditions || {});

      if (!emailServiceDocument) {
        throw new Error("Email Service Document not found");
      }

      this.logger.log({
        action: "Exit",
        method: this.findOne.name,
        metadata: {
          filter,
          projection,
          conditions,
          documentKeys: Object.keys(emailServiceDocument),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.findOne.name,
        metadata: {
          filter,
          projection,
          conditions,
          emailServiceDocument: emailServiceDocument,
        },
      });

      return emailServiceDocument;
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

      throw new Error("Failed to find email service document by filter");
    }
  }

  // PUT
  async findOneAndUpdate({
    conditions,
    update,
  }: {
    conditions: { [field: string]: unknown };
    update: { [field: string]: unknown };
  }): Promise<EmailServiceDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndUpdate.name,
        metadata: {
          conditions,
          update,
        },
      });

      const emailServiceDocument: EmailServiceDocument | null | undefined =
        await this.emailServiceModel.findOneAndUpdate(conditions, update, {
          timestamps: true,
          new: true,
        });

      if (!emailServiceDocument) {
        throw new Error("Email Service Document not found");
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
          emailServiceDocument: emailServiceDocument,
        },
      });

      return emailServiceDocument;
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

      throw new Error("Failed to update email service document by conditions");
    }
  }

  // PUT
  async findOneAndReplace({
    filter,
    replacement,
  }: {
    filter: { [field: string]: unknown };
    replacement: { [field: string]: unknown };
  }): Promise<EmailServiceDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndReplace.name,
        metadata: {
          filter,
          replacement,
        },
      });

      const emailServiceDocument: EmailServiceDocument | null | undefined =
        await this.emailServiceModel.findOneAndReplace(filter, replacement, {
          timestamps: true,
          new: true,
        });

      if (!emailServiceDocument) {
        throw new Error("Email Service Document not found");
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
          emailServiceDocument,
        },
      });

      return emailServiceDocument;
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

      throw new Error("Failed to replacement email service document by filter");
    }
  }

  // DELETE
  async findOneAndDelete({
    conditions,
  }: {
    conditions: { [field: string]: unknown };
  }): Promise<EmailServiceDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndDelete.name,
        metadata: {
          conditions,
        },
      });

      const emailServiceDocument: EmailServiceDocument | null | undefined =
        await this.emailServiceModel.findOneAndDelete(conditions);

      if (!emailServiceDocument) {
        throw new Error("Email Service Document not found");
      }

      this.logger.log({
        action: "Exit",
        method: this.findOneAndDelete.name,
        metadata: {
          conditions,
          documentKeys: Object.keys(emailServiceDocument),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.findOneAndDelete.name,
        metadata: {
          conditions,
          emailServiceDocument,
        },
      });

      return emailServiceDocument;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findOneAndDelete.name,
        error: error,
        metadata: {
          conditions,
        },
      });

      throw new Error("Failed to delete email service document by conditions");
    }
  }
}
