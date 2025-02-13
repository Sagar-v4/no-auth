import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";

import {
  FORM_SCHEMA_NAME,
  FormDocument,
} from "@/app/forms/entities/form.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";

@Injectable()
export class FormsService {
  private logger: Logger = new Logger(FormsService.name);

  constructor(
    @InjectModel(FORM_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.FORM)
    private readonly formModel: Model<FormDocument>,
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
    emailAppId: string;
    name: string;
    description: string;
    title: string;
    shortDescription: string;
    expiry: number;
    metadata: { [field: string]: unknown };
  }): Promise<FormDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          ...doc,
        },
      });

      const formDocument: FormDocument = await this.formModel.insertOne(doc, {
        validateBeforeSave: true,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          ...doc,
          documentKeys: Object.keys(formDocument),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          ...doc,
          formDocument,
        },
      });

      return formDocument;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        metadata: {
          ...doc,
        },
      });

      throw new Error("Failed to insert form document");
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
  }): Promise<FormDocument> {
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

      const formDocument: FormDocument | null | undefined = await this.formModel
        .findOne(filter, projection)
        .where(conditions ?? {});

      if (!formDocument) {
        throw new Error("Form Document not found");
      }

      this.logger.log({
        action: "Exit",
        method: this.findOne.name,
        metadata: {
          filter,
          projection,
          conditions,
          documentKeys: Object.keys(formDocument),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.findOne.name,
        metadata: {
          filter,
          projection,
          conditions,
          formDocument,
        },
      });

      return formDocument;
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

      throw new Error("Failed to find form document by filter");
    }
  }

  // PATCH
  async findOneAndUpdate({
    conditions,
    update,
  }: {
    conditions: { [field: string]: unknown };
    update: { [field: string]: unknown };
  }): Promise<FormDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndUpdate.name,
        metadata: {
          conditions,
          update,
        },
      });

      const formDocument: FormDocument | null | undefined =
        await this.formModel.findOneAndUpdate(conditions, update, {
          timestamps: true,
          new: true,
        });

      if (!formDocument) {
        throw new Error("Form Document not found");
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
          formDocument,
        },
      });

      return formDocument;
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

      throw new Error("Failed to update form document by conditions");
    }
  }

  // PUT
  async findOneAndReplace({
    filter,
    replacement,
  }: {
    filter: { [field: string]: unknown };
    replacement: { [field: string]: unknown };
  }): Promise<FormDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndReplace.name,
        metadata: {
          filter,
          replacement,
        },
      });

      const formDocument: FormDocument | null | undefined =
        await this.formModel.findOneAndReplace(filter, replacement, {
          timestamps: true,
          new: true,
        });

      if (!formDocument) {
        throw new Error("Form Document not found");
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
          formDocument,
        },
      });

      return formDocument;
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

      throw new Error("Failed to replacement form document by filter");
    }
  }

  // DELETE
  async findOneAndDelete({
    conditions,
  }: {
    conditions: { [field: string]: unknown };
  }): Promise<FormDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndDelete.name,
        metadata: {
          conditions,
        },
      });

      const formDocument: FormDocument | null | undefined =
        await this.formModel.findOneAndDelete(conditions);

      if (!formDocument) {
        throw new Error("Form Document not found");
      }

      this.logger.log({
        action: "Exit",
        method: this.findOneAndDelete.name,
        metadata: {
          conditions,
          documentKeys: Object.keys(formDocument),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.findOneAndDelete.name,
        metadata: {
          conditions,
          formDocument,
        },
      });

      return formDocument;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findOneAndDelete.name,
        error: error,
        metadata: {
          conditions,
        },
      });

      throw new Error("Failed to delete form document by conditions");
    }
  }
}
