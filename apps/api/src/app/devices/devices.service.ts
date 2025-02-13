import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";

import {
  DEVICE_SCHEMA_NAME,
  DeviceDocument,
} from "@/app/devices/entities/device.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";

@Injectable()
export class DevicesService {
  private logger: Logger = new Logger(DevicesService.name);

  constructor(
    @InjectModel(DEVICE_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.DEVICE)
    private readonly deviceModel: Model<DeviceDocument>,
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
    sessionIds: string[];
    metadata: { [field: string]: unknown };
  }): Promise<DeviceDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          ...doc,
        },
      });

      const deviceDocument: DeviceDocument = await this.deviceModel.insertOne(
        doc,
        {
          validateBeforeSave: true,
        },
      );

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          ...doc,
          documentKeys: Object.keys(deviceDocument),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          ...doc,
          deviceDocument,
        },
      });

      return deviceDocument;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        metadata: {
          ...doc,
        },
      });

      throw new Error("Failed to insert device document");
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
  }): Promise<DeviceDocument> {
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

      const deviceDocument: DeviceDocument | null | undefined =
        await this.deviceModel
          .findOne(filter, projection)
          .where(conditions ?? {});

      if (!deviceDocument) {
        throw new Error("Device Document not found");
      }

      this.logger.log({
        action: "Exit",
        method: this.findOne.name,
        metadata: {
          filter,
          projection,
          conditions,
          documentKeys: Object.keys(deviceDocument),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.findOne.name,
        metadata: {
          filter,
          projection,
          conditions,
          deviceDocument,
        },
      });

      return deviceDocument;
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

      throw new Error("Failed to find device document by filter");
    }
  }

  // PATCH
  async findOneAndUpdate({
    conditions,
    update,
  }: {
    conditions: { [field: string]: unknown };
    update: { [field: string]: unknown };
  }): Promise<DeviceDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndUpdate.name,
        metadata: {
          conditions,
          update,
        },
      });

      const deviceDocument: DeviceDocument | null | undefined =
        await this.deviceModel.findOneAndUpdate(conditions, update, {
          timestamps: true,
          new: true,
        });

      if (!deviceDocument) {
        throw new Error("Device Document not found");
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
          deviceDocument,
        },
      });

      return deviceDocument;
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

      throw new Error("Failed to update device document by conditions");
    }
  }

  // PUT
  async findOneAndReplace({
    filter,
    replacement,
  }: {
    filter: { [field: string]: unknown };
    replacement: { [field: string]: unknown };
  }): Promise<DeviceDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndReplace.name,
        metadata: {
          filter,
          replacement,
        },
      });

      const deviceDocument: DeviceDocument | null | undefined =
        await this.deviceModel.findOneAndReplace(filter, replacement, {
          timestamps: true,
          new: true,
        });

      if (!deviceDocument) {
        throw new Error("Device Document not found");
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
          deviceDocument,
        },
      });

      return deviceDocument;
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

      throw new Error("Failed to replacement device document by filter");
    }
  }

  // DELETE
  async findOneAndDelete({
    conditions,
  }: {
    conditions: { [field: string]: unknown };
  }): Promise<DeviceDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndDelete.name,
        metadata: {
          conditions,
        },
      });

      const deviceDocument: DeviceDocument | null | undefined =
        await this.deviceModel.findOneAndDelete(conditions);

      if (!deviceDocument) {
        throw new Error("Device Document not found");
      }

      this.logger.log({
        action: "Exit",
        method: this.findOneAndDelete.name,
        metadata: {
          conditions,
          documentKeys: Object.keys(deviceDocument),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.findOneAndDelete.name,
        metadata: {
          conditions,
          deviceDocument,
        },
      });

      return deviceDocument;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findOneAndDelete.name,
        error: error,
        metadata: {
          conditions,
        },
      });

      throw new Error("Failed to delete device document by conditions");
    }
  }
}
