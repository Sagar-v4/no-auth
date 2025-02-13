import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";

import {
  ORGANIZATION_SCHEMA_NAME,
  OrganizationDocument,
} from "@/app/organizations/entities/organization.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";

@Injectable()
export class OrganizationsService {
  private logger: Logger = new Logger(OrganizationsService.name);

  constructor(
    @InjectModel(ORGANIZATION_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.ORGANIZATION)
    private readonly organizationModel: Model<OrganizationDocument>,
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
    domain: string;
    clientId: string;
    name: string;
    description: string;
    metadata: { [field: string]: unknown };
  }): Promise<OrganizationDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          ...doc,
        },
      });

      const organizationDocument: OrganizationDocument =
        await this.organizationModel.insertOne(doc, {
          validateBeforeSave: true,
        });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          ...doc,
          documentKeys: Object.keys(organizationDocument),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          ...doc,
          organizationDocument,
        },
      });

      return organizationDocument;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        metadata: {
          ...doc,
        },
      });

      throw new Error("Failed to insert organization document");
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
  }): Promise<OrganizationDocument> {
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

      const organizationDocument: OrganizationDocument | null | undefined =
        await this.organizationModel
          .findOne(filter, projection)
          .where(conditions ?? {});

      if (!organizationDocument) {
        throw new Error("Organization Document not found");
      }

      this.logger.log({
        action: "Exit",
        method: this.findOne.name,
        metadata: {
          filter,
          projection,
          conditions,
          documentKeys: Object.keys(organizationDocument),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.findOne.name,
        metadata: {
          filter,
          projection,
          conditions,
          organizationDocument,
        },
      });

      return organizationDocument;
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

      throw new Error("Failed to find organization document by filter");
    }
  }

  // PATCH
  async findOneAndUpdate({
    conditions,
    update,
  }: {
    conditions: { [field: string]: unknown };
    update: { [field: string]: unknown };
  }): Promise<OrganizationDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndUpdate.name,
        metadata: {
          conditions,
          update,
        },
      });

      const organizationDocument: OrganizationDocument | null | undefined =
        await this.organizationModel.findOneAndUpdate(conditions, update, {
          timestamps: true,
          new: true,
        });

      if (!organizationDocument) {
        throw new Error("Organization Document not found");
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
          organizationDocument,
        },
      });

      return organizationDocument;
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

      throw new Error("Failed to update organization document by conditions");
    }
  }

  // PUT
  async findOneAndReplace({
    filter,
    replacement,
  }: {
    filter: { [field: string]: unknown };
    replacement: { [field: string]: unknown };
  }): Promise<OrganizationDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndReplace.name,
        metadata: {
          filter,
          replacement,
        },
      });

      const organizationDocument: OrganizationDocument | null | undefined =
        await this.organizationModel.findOneAndReplace(filter, replacement, {
          timestamps: true,
          new: true,
        });

      if (!organizationDocument) {
        throw new Error("Organization Document not found");
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
          organizationDocument,
        },
      });

      return organizationDocument;
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

      throw new Error("Failed to replacement organization document by filter");
    }
  }

  // DELETE
  async findOneAndDelete({
    conditions,
  }: {
    conditions: { [field: string]: unknown };
  }): Promise<OrganizationDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndDelete.name,
        metadata: {
          conditions,
        },
      });

      const organizationDocument: OrganizationDocument | null | undefined =
        await this.organizationModel.findOneAndDelete(conditions);

      if (!organizationDocument) {
        throw new Error("Organization Document not found");
      }

      this.logger.log({
        action: "Exit",
        method: this.findOneAndDelete.name,
        metadata: {
          conditions,
          documentKeys: Object.keys(organizationDocument),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.findOneAndDelete.name,
        metadata: {
          conditions,
          organizationDocument,
        },
      });

      return organizationDocument;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findOneAndDelete.name,
        error: error,
        metadata: {
          conditions,
        },
      });

      throw new Error("Failed to delete organization document by conditions");
    }
  }
}
