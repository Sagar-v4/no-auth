import { Injectable, Logger } from "@nestjs/common";

import {
  STATUS as EMAIL_APP_STATUS,
  TYPES as EMAIL_APP_TYPES,
} from "@/app/email/apps/entities/app.entity";
import { NodeMailer } from "@/app/email/services/providers";
import { EmailAppsService } from "@/app/email/apps/apps.service";
import { EmailServicesService } from "@/app/email/services/services.service";
import { EmailTemplatesService } from "@/app/email/templates/templates.service";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import { EmailServiceDocument } from "@/app/email/services/entities/service.entity";
import { STATUS as ORGANIZATION_STATUS } from "@/app/organizations/entities/organization.entity";

@Injectable()
export class EmailServicesProvidersService {
  private logger: Logger = new Logger(EmailServicesProvidersService.name);

  constructor(
    private readonly emailAppsService: EmailAppsService,
    private readonly emailServicesService: EmailServicesService,
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

  async sendEmail(data: {
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
          ...data,
        },
      });

      const { otp, formId, emailAppId, organizationId, ...metadata } = data;

      const emailApp: any = await this.emailAppsService.find({
        filter: { _id: emailAppId, organizationId: organizationId },
        populate: [],
        select: ["domain"],
      });
      if (!emailApp) {
        throw new Error("Email App not found or not active");
      }

      const organization: any = await this.organizationsService.find({
        filter: { _id: organizationId, status: ORGANIZATION_STATUS.ACTIVE },
        populate: [],
        select: ["domain"],
      });
      if (!organization) {
        throw new Error("Organization not found or not active");
      }

      let finalOTP: string | undefined = otp;
      if (!finalOTP) {
        finalOTP = "123456";
      }

      const emailServiceDocument: EmailServiceDocument | null | undefined =
        await this.emailServicesService.insertOne({
          formId,
          emailAppId,
          organizationId,
          metadata: { otp: finalOTP, ...metadata },
        });

      let messageId: string;
      switch (emailApp.type) {
        case EMAIL_APP_TYPES.NODE_MAILER:
          messageId = await this.handleNodeMailer({
            ...metadata,
            otp: finalOTP,
            emailApp: emailApp,
            emailServiceDocument: emailServiceDocument,
          });
          break;
        default:
          throw new Error("Unsupported email app type");
      }

      this.logger.log({
        action: "Exit",
        method: this.sendEmail.name,
        metadata: {
          ...data,
          messageId,
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.sendEmail.name,
        metadata: {
          ...data,
          messageId,
        },
      });

      return messageId;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.sendEmail.name,
        error: error,
        metadata: {
          ...data,
        },
      });

      throw new Error("Failed to send email");
    }
  }

  async handleNodeMailer(data: {
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    from?: string;
    sender?: string;
    subject: string;
    otp: string;
    emailApp: { [key: string]: unknown } | any;
    emailServiceDocument: { [key: string]: unknown } | any;
  }): Promise<string> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.handleNodeMailer.name,
        metadata: {
          ...data,
        },
      });

      const provider: NodeMailer = new NodeMailer();

      const { otp, emailApp, emailServiceDocument, ...metadata } = data;

      const { html, text } = this.emailTemplatesService.generateTemplateOTP({
        otp,
      });

      provider.createTemplate({ text, html });
      provider.createTransporter({
        appMetadata: emailApp.metadata,
        messageId: emailServiceDocument.uuid,
        ...metadata,
      });
      await provider.verifyConfiguration();
      const result = await provider.sendEmail();

      await this.emailServicesService.findOneAndUpdate({
        conditions: { _id: emailServiceDocument._id },
        update: {
          metadata: {
            ...emailServiceDocument.metadata,
            result,
          },
        },
      });

      this.logger.log({
        action: "Exit",
        method: this.handleNodeMailer.name,
        metadata: {
          ...data,
          messageId: emailServiceDocument.uuid,
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.handleNodeMailer.name,
        metadata: {
          ...data,
          emailServiceDocument,
        },
      });

      return emailServiceDocument.uuid;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.handleNodeMailer.name,
        error: error,
        metadata: {
          ...data,
        },
      });

      throw new Error("Failed to send email");
    }
  }
}
