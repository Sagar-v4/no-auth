import {
  DeleteResult,
  InsertManyResult,
  Model,
  RootFilterQuery,
  UpdateQuery,
  UpdateWriteOpResult,
} from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";

import {
  CLIENTELE_SCHEMA_NAME,
  ClienteleDocument,
} from "@/app/clienteles/entities/clientele.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { TRPCError } from "@trpc/server";
import { ERROR } from "@/trpc/error";

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
      console.log("🚀 ~ CLIENTELE_SCHEMA_NAME:", CLIENTELE_SCHEMA_NAME);
    } catch (error) {
      this.logger.error({
        action: "Construct",
        error: error,
      });

      throw new Error("Constructor Failure!");
    }
  }

  async insertOne(input: {
    doc: {
      organization_id: string;
    };
  }): Promise<ClienteleDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          input,
        },
      });

      const document: ClienteleDocument = await this.clienteleModel.insertOne(
        input.doc,
        {
          validateBeforeSave: true,
        },
      );

      if (!document) {
        throw new TRPCError(ERROR.CLIENTELE.NOT_FOUND);
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

  async insertMany(input: {
    docs: {
      organization_id: string;
    }[];
  }): Promise<InsertManyResult<any>> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          input,
        },
      });

      const result: InsertManyResult<any> =
        await this.clienteleModel.insertMany(input.docs, {
          includeResultMetadata: true,
          rawResult: true,
        });

      if (!result || !result.acknowledged) {
        throw new TRPCError(ERROR.CLIENTELE.NOT_FOUND);
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
    populate: string[];
  }): Promise<ClienteleDocument[]> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.find.name,
        metadata: {
          input,
        },
      });

      const documents: ClienteleDocument[] | null = await this.clienteleModel
        .find(input.filter)
        .select(input.select)
        .populate(input.populate)
        .exec();

      if (!documents) {
        throw new TRPCError(ERROR.CLIENTELE.NOT_FOUND);
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
    populate: string[];
  }): Promise<ClienteleDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndUpdate.name,
        metadata: {
          input,
        },
      });

      const document: ClienteleDocument | null = await this.clienteleModel
        .findOneAndUpdate(input.filter, input.update, {
          new: true,
          upsert: false,
        })
        .select(input.select)
        .populate(input.populate)
        .exec();

      if (!document) {
        throw new TRPCError(ERROR.CLIENTELE.NOT_FOUND);
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
    populate: string[];
  }): Promise<UpdateWriteOpResult> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateMany.name,
        metadata: {
          input,
        },
      });

      const document: UpdateWriteOpResult = await this.clienteleModel
        .updateMany(input.filter, input.update, {
          new: true,
          upsert: false,
        })
        .select(input.select)
        .populate(input.populate)
        .exec();

      if (!document) {
        throw new TRPCError(ERROR.CLIENTELE.NOT_FOUND);
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

      const result: DeleteResult = await this.clienteleModel.deleteMany(
        input.filter,
      );

      if (!result || !result.acknowledged) {
        throw new TRPCError(ERROR.CLIENTELE.NOT_FOUND);
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
}
