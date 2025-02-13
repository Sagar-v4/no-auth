import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";

import {
  STATUS as EMAIL_APP_STATUS,
  TYPES as EMAIL_APP_TYPES,
} from "@/app/email/apps/entities/app.entity";
import {
  EMAIL_SERVICE_SCHEMA_NAME,
  EmailServiceDocument,
} from "@/app/email/services/entities/service.entity";
import { NodeMailer } from "@/app/email/services/providers/node-mailer.service";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { EmailAppsService } from "@/app/email/apps/apps.service";
import { EmailTemplatesService } from "@/app/email/templates/templates.service";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import { STATUS as ORGANIZATION_STATUS } from "@/app/organizations/entities/organization.entity";

@Injectable()
export class EmailServicesService {
  private logger: Logger = new Logger(EmailServicesService.name);

  constructor(
    @InjectModel(EMAIL_SERVICE_SCHEMA_NAME, MONGOOSE_DB_CONNECTION.EMAIL)
    private readonly emailServiceModel: Model<EmailServiceDocument>,
    private readonly emailAppsService: EmailAppsService,
    private readonly emailTemplatesService: EmailTemplatesService,
    private readonly organizationsService: OrganizationsService,
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

  async sendEmail(email: {
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    from?: string;
    sender?: string;
    subject: string;
    otp?: string;
    formId: string;
    emailAppId: string;
    organizationId: string;
  }): Promise<string> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.sendEmail.name,
        metadata: {
          ...email,
        },
      });

      const { otp, formId, emailAppId, organizationId, ...metadata } = email;
      const emailApp: any = await this.emailAppsService.findOne({
        filter: { _id: emailAppId, organizationId: organizationId },
        projection: { type: 1, metadata: 1 },
        conditions: { status: EMAIL_APP_STATUS.ACTIVE },
      });
      if (!emailApp) {
        throw new Error("Email App not found or not active");
      }

      const organization: any = await this.organizationsService.findOne({
        filter: { _id: organizationId },
        projection: { domain: 1 },
        conditions: { status: ORGANIZATION_STATUS.ACTIVE },
      });
      if (!organization) {
        throw new Error("Organization not found or not active");
      }

      let finalOTP: string | undefined = otp;
      if (!finalOTP) {
        finalOTP = "123456";
      }

      const emailServiceDocument: EmailServiceDocument | null | undefined =
        await this.insertOne({
          formId,
          emailAppId,
          organizationId,
          metadata: { otp: finalOTP, ...metadata },
        });

      let emailServiceProvider: NodeMailer | undefined;
      switch (emailApp.type) {
        case EMAIL_APP_TYPES.NODE_MAILER:
          emailServiceProvider = new NodeMailer();
          break;
        default:
          throw new Error("Unsupported email service type");
      }

      const { html, text } = this.emailTemplatesService.generateTemplateOTP({
        otp: finalOTP,
      });

      emailServiceProvider.createTemplate({ text, html });
      emailServiceProvider.createTransporter({
        appMetadata: emailApp.metadata,
        messageId: emailServiceDocument.uuid,
        ...metadata,
      });
      await emailServiceProvider.verifyConfiguration();

      const emailSendResult = await emailServiceProvider.sendEmail();

      await this.findOneAndUpdate({
        conditions: { _id: emailServiceDocument._id },
        update: {
          metadata: {
            ...emailServiceDocument.metadata,
            result: emailSendResult,
          },
        },
      });

      this.logger.log({
        action: "Exit",
        method: this.sendEmail.name,
        metadata: {
          ...email,
          uuid: emailServiceDocument.uuid,
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.sendEmail.name,
        metadata: {
          ...email,
          emailServiceDocument: emailServiceDocument,
        },
      });

      return emailServiceDocument.uuid;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.sendEmail.name,
        error: error,
        metadata: {
          ...email,
        },
      });

      throw new Error("Failed to send email");
    }
  }
}
