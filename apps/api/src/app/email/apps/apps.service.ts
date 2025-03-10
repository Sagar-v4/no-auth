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
  EMAIL_APP_SCHEMA_NAME,
  EmailAppDocument,
} from "@/app/email/apps/entities/app.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { TRPCError } from "@trpc/server";
import { ERROR } from "@/trpc/error";
import {
  InsertManyEmailAppInputType,
  InsertOneEmailAppInputType,
} from "@/lib/trpc/schemas/email/apps";

@Injectable()
export class EmailAppsService {
  private logger: Logger = new Logger(EmailAppsService.name);

  constructor(
    @InjectModel(EMAIL_APP_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.EMAIL_APP)
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

  async insertOne(
    input: InsertOneEmailAppInputType,
  ): Promise<EmailAppDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          input,
        },
      });

      const document: EmailAppDocument = await this.emailAppModel.insertOne(
        input.doc,
        {
          validateBeforeSave: true,
        },
      );

      if (!document) {
        throw new TRPCError(ERROR.EMAIL_APP.NOT_FOUND);
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
    input: InsertManyEmailAppInputType,
  ): Promise<InsertManyResult<any>> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          input,
        },
      });

      const result: InsertManyResult<any> = await this.emailAppModel.insertMany(
        input.docs,
        {
          includeResultMetadata: true,
          rawResult: true,
        },
      );

      if (!result || !result.acknowledged) {
        throw new TRPCError(ERROR.EMAIL_APP.NOT_FOUND);
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
  }): Promise<EmailAppDocument[]> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.find.name,
        metadata: {
          input,
        },
      });

      const documents: EmailAppDocument[] | null = await this.emailAppModel
        .find(input.filter)
        .select(input.select)
        .populate(input.populate)
        .exec();

      if (!documents) {
        throw new TRPCError(ERROR.EMAIL_APP.NOT_FOUND);
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
  }): Promise<EmailAppDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndUpdate.name,
        metadata: {
          input,
        },
      });

      const document: EmailAppDocument | null = await this.emailAppModel
        .findOneAndUpdate(input.filter, input.update, {
          new: true,
          upsert: false,
        })
        .select(input.select)
        .populate(input.populate)
        .exec();

      if (!document) {
        throw new TRPCError(ERROR.EMAIL_APP.NOT_FOUND);
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

      const document: UpdateWriteOpResult = await this.emailAppModel
        .updateMany(input.filter, input.update, {
          new: true,
          upsert: false,
        })
        .select(input.select)
        .populate(input.populate)
        .exec();

      if (!document) {
        throw new TRPCError(ERROR.EMAIL_APP.NOT_FOUND);
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

      const result: DeleteResult = await this.emailAppModel.deleteMany(
        input.filter,
      );

      if (!result || !result.acknowledged) {
        throw new TRPCError(ERROR.EMAIL_APP.NOT_FOUND);
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

      const documents: EmailAppDocument[] | null = await this.emailAppModel
        .find(filter)
        .select("_id")
        .exec();

      if (!documents) {
        throw new TRPCError(ERROR.EMAILAPP.NOT_FOUND);
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
