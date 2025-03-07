import {
  DeleteResult,
  InsertManyResult,
  Model,
  PopulateOptions,
  RootFilterQuery,
  UpdateQuery,
  UpdateWriteOpResult,
} from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";

import {
  PERMISSION_SCHEMA_NAME,
  PermissionDocument,
} from "@/app/permissions/entities/permission.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { TRPCError } from "@trpc/server";
import { ERROR } from "@/trpc/error";
import {
  InsertManyPermissionInputType,
  InsertOnePermissionInputType,
} from "@/lib/trpc/schemas/permissions";

@Injectable()
export class PermissionsService {
  private logger: Logger = new Logger(PermissionsService.name);

  constructor(
    @InjectModel(PERMISSION_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.PERMISSION)
    private readonly permissionModel: Model<PermissionDocument>,
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

  async insertOne(
    input: InsertOnePermissionInputType,
  ): Promise<PermissionDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          input,
        },
      });

      const document: PermissionDocument = await this.permissionModel.insertOne(
        input.doc,
        {
          validateBeforeSave: true,
        },
      );

      if (!document) {
        throw new TRPCError(ERROR.PERMISSION.NOT_FOUND);
      }

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          documentKeys: Object.keys(document),
        },
      });

      return document;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        metadata: {
          input,
        },
      });

      throw error;
    }
  }

  async insertMany(
    input: InsertManyPermissionInputType,
  ): Promise<InsertManyResult<any>> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          input,
        },
      });

      const result: InsertManyResult<any> =
        await this.permissionModel.insertMany(input.docs, {
          includeResultMetadata: true,
          rawResult: true,
        });

      if (!result || !result.acknowledged) {
        throw new TRPCError(ERROR.PERMISSION.NOT_FOUND);
      }

      if (
        result.mongoose?.validationErrors &&
        result.mongoose?.validationErrors?.length > 0
      ) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Invalid data",
          cause: result.mongoose?.validationErrors,
        });
      }

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return result;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertMany.name,
        error: error,
        metadata: {
          input,
        },
      });

      throw error;
    }
  }

  async find(input: {
    filter: RootFilterQuery<any>;
    select: string[];
    populate: PopulateOptions | (PopulateOptions | string)[];
  }): Promise<PermissionDocument[]> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.find.name,
        metadata: {
          input,
        },
      });

      const documents: PermissionDocument[] | null = await this.permissionModel
        .find(input.filter)
        .select(input.select)
        .populate(input.populate)
        .exec();

      if (!documents) {
        throw new TRPCError(ERROR.PERMISSION.NOT_FOUND);
      }

      this.logger.log({
        action: "Exit",
        method: this.find.name,
        metadata: {
          input,
          documentKeys: documents.map((document) => Object.keys(document)),
        },
      });

      return documents;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.find.name,
        error: error,
        metadata: {
          input,
        },
      });

      throw error;
    }
  }

  async findOneAndUpdate(input: {
    filter: RootFilterQuery<any>;
    update: UpdateQuery<any>;
    select: string[];
    populate: PopulateOptions | (PopulateOptions | string)[];
  }): Promise<PermissionDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndUpdate.name,
        metadata: {
          input,
        },
      });

      const document: PermissionDocument | null = await this.permissionModel
        .findOneAndUpdate(input.filter, input.update, {
          new: true,
          upsert: false,
        })
        .select(input.select)
        .populate(input.populate)
        .exec();

      if (!document) {
        throw new TRPCError(ERROR.PERMISSION.NOT_FOUND);
      }

      this.logger.log({
        action: "Exit",
        method: this.findOneAndUpdate.name,
        metadata: {
          documentKeys: Object.keys(document),
        },
      });

      return document;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findOneAndUpdate.name,
        error: error,
        metadata: {
          input,
        },
      });

      throw error;
    }
  }

  async updateMany(input: {
    filter: RootFilterQuery<any>;
    update: UpdateQuery<any>;
    select: string[];
    populate: PopulateOptions | (PopulateOptions | string)[];
  }): Promise<UpdateWriteOpResult> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateMany.name,
        metadata: {
          input,
        },
      });

      const document: UpdateWriteOpResult = await this.permissionModel
        .updateMany(input.filter, input.update, {
          new: true,
          upsert: false,
        })
        .select(input.select)
        .populate(input.populate)
        .exec();

      if (!document) {
        throw new TRPCError(ERROR.PERMISSION.NOT_FOUND);
      }

      this.logger.log({
        action: "Exit",
        method: this.updateMany.name,
        metadata: {
          documentKeys: Object.keys(document),
        },
      });

      return document;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateMany.name,
        error: error,
        metadata: {
          input,
        },
      });

      throw error;
    }
  }

  async delete(input: { filter: RootFilterQuery<any> }): Promise<Number> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.delete.name,
        metadata: {
          input,
        },
      });

      const result: DeleteResult = await this.permissionModel.deleteMany(
        input.filter,
      );

      if (!result || !result.acknowledged) {
        throw new TRPCError(ERROR.PERMISSION.NOT_FOUND);
      }

      this.logger.log({
        action: "Exit",
        method: this.delete.name,
        metadata: {
          result,
        },
      });

      return result.deletedCount;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.delete.name,
        error: error,
        metadata: {
          input,
        },
      });

      throw error;
    }
  }

  async getIds(filter: RootFilterQuery<any>): Promise<string[]> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.getIds.name,
        metadata: {
          filter,
        },
      });

      if (Object.keys(filter).length === 0) {
        this.logger.warn({
          action: "Exit",
          method: this.getIds.name,
          metadata: {
            filter,
          },
        });
        return [];
      }

      const documents: PermissionDocument[] | null = await this.permissionModel
        .find(filter)
        .select("_id")
        .exec();

      if (!documents) {
        throw new TRPCError(ERROR.PERMISSION.NOT_FOUND);
      }

      const documentIds = documents.map((document) => document._id.toString());

      this.logger.log({
        action: "Exit",
        method: this.getIds.name,
        metadata: {
          filter,
          documentIds,
        },
      });

      return documentIds;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.getIds.name,
        error: error,
        metadata: {
          filter,
        },
      });

      throw error;
    }
  }
}
