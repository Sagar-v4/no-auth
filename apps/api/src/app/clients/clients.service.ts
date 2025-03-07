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
  CLIENT_SCHEMA_NAME,
  ClientDocument,
} from "@/app/clients/entities/client.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { TRPCError } from "@trpc/server";
import { ERROR } from "@/trpc/error";
import {
  InsertManyClientInputType,
  InsertOneClientInputType,
} from "@/lib/trpc/schemas/clients";

@Injectable()
export class ClientsService {
  private logger: Logger = new Logger(ClientsService.name);

  constructor(
    @InjectModel(CLIENT_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.CLIENT)
    private readonly clientModel: Model<ClientDocument>,
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

  async insertOne(input: InsertOneClientInputType): Promise<ClientDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          input,
        },
      });

      const document: ClientDocument = await this.clientModel.insertOne(
        input.doc,
        {
          validateBeforeSave: true,
        },
      );

      if (!document) {
        throw new TRPCError(ERROR.CLIENT.NOT_FOUND);
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
    input: InsertManyClientInputType,
  ): Promise<InsertManyResult<any>> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          input,
        },
      });

      const result: InsertManyResult<any> = await this.clientModel.insertMany(
        input.docs,
        {
          includeResultMetadata: true,
          rawResult: true,
        },
      );

      if (!result || !result.acknowledged) {
        throw new TRPCError(ERROR.CLIENT.NOT_FOUND);
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
  }): Promise<ClientDocument[]> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.find.name,
        metadata: {
          input,
        },
      });

      const documents: ClientDocument[] | null = await this.clientModel
        .find(input.filter)
        .select(input.select)
        .populate(input.populate)
        .exec();

      if (!documents) {
        throw new TRPCError(ERROR.CLIENT.NOT_FOUND);
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
  }): Promise<ClientDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndUpdate.name,
        metadata: {
          input,
        },
      });

      const document: ClientDocument | null = await this.clientModel
        .findOneAndUpdate(input.filter, input.update, {
          new: true,
          upsert: false,
        })
        .select(input.select)
        .populate(input.populate)
        .exec();

      if (!document) {
        throw new TRPCError(ERROR.CLIENT.NOT_FOUND);
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

      const document: UpdateWriteOpResult = await this.clientModel
        .updateMany(input.filter, input.update, {
          new: true,
          upsert: false,
        })
        .select(input.select)
        .populate(input.populate)
        .exec();

      if (!document) {
        throw new TRPCError(ERROR.CLIENT.NOT_FOUND);
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

      const result: DeleteResult = await this.clientModel.deleteMany(
        input.filter,
      );

      if (!result || !result.acknowledged) {
        throw new TRPCError(ERROR.CLIENT.NOT_FOUND);
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

      const documents: ClientDocument[] | null = await this.clientModel
        .find(filter)
        .select("_id")
        .exec();

      if (!documents) {
        throw new TRPCError(ERROR.CLIENT.NOT_FOUND);
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
