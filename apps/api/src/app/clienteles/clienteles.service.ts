import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";

import {
  CLIENTELE_SCHEMA_NAME,
  ClienteleDocument,
} from "@/app/clienteles/entities/clientele.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";

@Injectable()
export class ClientelesService {
  private logger: Logger = new Logger(ClientelesService.name);

  constructor(
    @InjectModel(CLIENTELE_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.CLIENTELE)
    private readonly clienteleModel: Model<ClienteleDocument>,
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
    organizationId: string;
    metadata: { [field: string]: unknown };
  }): Promise<ClienteleDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          ...doc,
        },
      });

      const clienteleDocument: ClienteleDocument =
        await this.clienteleModel.insertOne(doc, {
          validateBeforeSave: true,
        });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          ...doc,
          documentKeys: Object.keys(clienteleDocument),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          ...doc,
          clienteleDocument,
        },
      });

      return clienteleDocument;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        metadata: {
          ...doc,
        },
      });

      throw new Error("Failed to insert clientele document");
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
  }): Promise<ClienteleDocument> {
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

      const clienteleDocument: ClienteleDocument | null | undefined =
        await this.clienteleModel
          .findOne(filter, projection)
          .where(conditions ?? {});

      if (!clienteleDocument) {
        throw new Error("Clientele Document not found");
      }

      this.logger.log({
        action: "Exit",
        method: this.findOne.name,
        metadata: {
          filter,
          projection,
          conditions,
          documentKeys: Object.keys(clienteleDocument),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.findOne.name,
        metadata: {
          filter,
          projection,
          conditions,
          clienteleDocument,
        },
      });

      return clienteleDocument;
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

      throw new Error("Failed to find clientele document by filter");
    }
  }

  // PATCH
  async findOneAndUpdate({
    conditions,
    update,
  }: {
    conditions: { [field: string]: unknown };
    update: { [field: string]: unknown };
  }): Promise<ClienteleDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndUpdate.name,
        metadata: {
          conditions,
          update,
        },
      });

      const clienteleDocument: ClienteleDocument | null | undefined =
        await this.clienteleModel.findOneAndUpdate(conditions, update, {
          timestamps: true,
          new: true,
        });

      if (!clienteleDocument) {
        throw new Error("Clientele Document not found");
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
          clienteleDocument,
        },
      });

      return clienteleDocument;
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

      throw new Error("Failed to update clientele document by conditions");
    }
  }

  // PUT
  async findOneAndReplace({
    filter,
    replacement,
  }: {
    filter: { [field: string]: unknown };
    replacement: { [field: string]: unknown };
  }): Promise<ClienteleDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndReplace.name,
        metadata: {
          filter,
          replacement,
        },
      });

      const clienteleDocument: ClienteleDocument | null | undefined =
        await this.clienteleModel.findOneAndReplace(filter, replacement, {
          timestamps: true,
          new: true,
        });

      if (!clienteleDocument) {
        throw new Error("Clientele Document not found");
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
          clienteleDocument,
        },
      });

      return clienteleDocument;
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

      throw new Error("Failed to replacement clientele document by filter");
    }
  }

  // DELETE
  async findOneAndDelete({
    conditions,
  }: {
    conditions: { [field: string]: unknown };
  }): Promise<ClienteleDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndDelete.name,
        metadata: {
          conditions,
        },
      });

      const clienteleDocument: ClienteleDocument | null | undefined =
        await this.clienteleModel.findOneAndDelete(conditions);

      if (!clienteleDocument) {
        throw new Error("Clientele Document not found");
      }

      this.logger.log({
        action: "Exit",
        method: this.findOneAndDelete.name,
        metadata: {
          conditions,
          documentKeys: Object.keys(clienteleDocument),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.findOneAndDelete.name,
        metadata: {
          conditions,
          clienteleDocument,
        },
      });

      return clienteleDocument;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findOneAndDelete.name,
        error: error,
        metadata: {
          conditions,
        },
      });

      throw new Error("Failed to delete clientele document by conditions");
    }
  }
}
