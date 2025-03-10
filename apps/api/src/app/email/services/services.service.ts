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
import * as nodemailer from "nodemailer";

import {
  EMAIL_SERVICE_SCHEMA_NAME,
  EmailServiceDocument,
} from "@/app/email/services/entities/service.entity";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { TRPCError } from "@trpc/server";
import { ERROR } from "@/trpc/error";
import {
  InsertManyEmailServiceInputType,
  InsertOneEmailServiceInputType,
} from "@/lib/trpc/schemas/email/services";
import { EnvService } from "@/env/env.service";

@Injectable()
export class EmailServicesService {
  private transporter!: nodemailer.Transporter;
  private logger: Logger = new Logger(EmailServicesService.name);

  constructor(
    @InjectModel(
      EMAIL_SERVICE_SCHEMA_NAME,
      MONGOOSE_DB_CONNECTION.EMAIL_SERVICE,
    )
    private readonly emailServiceModel: Model<EmailServiceDocument>,
    private readonly envService: EnvService,
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
    input: InsertOneEmailServiceInputType,
  ): Promise<EmailServiceDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          input,
        },
      });

      const document: EmailServiceDocument =
        await this.emailServiceModel.insertOne(input.doc, {
          validateBeforeSave: true,
        });

      if (!document) {
        throw new TRPCError(ERROR.SESSIOIN.NOT_FOUND);
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

      throw new Error("Failed to insert emailservice document");
    }
  }

  async insertMany(
    input: InsertManyEmailServiceInputType,
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
        await this.emailServiceModel.insertMany(input.docs, {
          includeResultMetadata: true,
          rawResult: true,
        });

      if (!result || !result.acknowledged) {
        throw new TRPCError(ERROR.EMAILSERVICE.NOT_FOUND);
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
  }): Promise<EmailServiceDocument[]> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.find.name,
        metadata: {
          input,
        },
      });

      const documents: EmailServiceDocument[] | null =
        await this.emailServiceModel
          .find(input.filter)
          .select(input.select)
          .populate(input.populate)
          .exec();

      if (!documents) {
        throw new TRPCError(ERROR.EMAILSERVICE.NOT_FOUND);
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
  }): Promise<EmailServiceDocument> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findOneAndUpdate.name,
        metadata: {
          input,
        },
      });

      const document: EmailServiceDocument | null = await this.emailServiceModel
        .findOneAndUpdate(input.filter, input.update, {
          new: true,
          upsert: false,
        })
        .select(input.select)
        .populate(input.populate)
        .exec();

      if (!document) {
        throw new TRPCError(ERROR.EMAILSERVICE.NOT_FOUND);
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

      const document: UpdateWriteOpResult = await this.emailServiceModel
        .updateMany(input.filter, input.update, {
          new: true,
          upsert: false,
        })
        .select(input.select)
        .populate(input.populate)
        .exec();

      if (!document) {
        throw new TRPCError(ERROR.EMAILSERVICE.NOT_FOUND);
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

      const result: DeleteResult = await this.emailServiceModel.deleteMany(
        input.filter,
      );

      if (!result || !result.acknowledged) {
        throw new TRPCError(ERROR.EMAILSERVICE.NOT_FOUND);
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

      const documents: EmailServiceDocument[] | null =
        await this.emailServiceModel.find(filter).select("_id").exec();

      if (!documents) {
        throw new TRPCError(ERROR.EMAILSERVICE.NOT_FOUND);
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

  async createTransport() {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.createTransport.name,
      });

      this.transporter = nodemailer.createTransport({
        // NOTE: not needed when `service: "gmail"`
        // host: "smtp.google.com",
        // port: 465,
        // secure: true, // true for port 465, false for other ports
        service: "gmail",
        auth: {
          user: this.envService.get("GMAIL_USER"),
          pass: this.envService.get("GMAIL_PASS"),
        },
      });

      const verification: boolean = await this.transporter.verify();

      this.logger.log({
        action: "Exit",
        method: this.createTransport.name,
        metadata: {
          verification,
        },
      });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.createTransport.name,
        error: error,
      });

      this.transporter?.close();

      throw error;
    }
  }

  async sendEmail(input: {
    from?: string;
    to: string[];
    subject: string;
    text?: string;
    html?: string;
  }) {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.sendEmail.name,
      });

      await this.createTransport();

      const start = new Date();
      const info = await this.transporter.sendMail({
        from: input.from ?? `no-reply <${this.envService.get("GMAIL_USER")}>`,
        to: input.to,
        subject: input.subject,
        text: input.text,
        html: input.html,
      });
      const end = new Date();
      const sent_time = end.getTime() - start.getTime();

      this.logger.log({
        action: "Exit",
        method: this.sendEmail.name,
        metadata: {
          accepted_count: info.accepted.length,
          rejected_count: info.rejected.length,
          message_id: info.messageId,
          sent_time_ms: sent_time,
        },
      });

      return { ...info, sent_time, sent_at: end };
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.sendEmail.name,
        error: error,
      });

      throw error;
    } finally {
      this.logger.debug({
        action: "Close",
        method: this.sendEmail.name,
      });
      this.transporter?.close();
    }
  }
}
