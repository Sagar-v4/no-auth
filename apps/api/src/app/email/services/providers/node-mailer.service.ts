import * as nodemailer from "nodemailer";
import { Injectable, Logger } from "@nestjs/common";
import { EmailTemplatesService } from "@/app/email/templates/templates.service";
import { EmailAppsService } from "@/app/email/apps/apps.service";
@Injectable()
export class NodeMailer {
  private html!: string;
  private text!: string;
  private transporter!: nodemailer.Transporter;
  private logger: Logger = new Logger(NodeMailer.name);

  constructor() {
    try {
      this.logger.log({
        action: "Construct",
      });
      this.text = "Hello";
      this.createTransporter;
    } catch (error) {
      this.logger.error({
        action: "Construct",
        error: error,
      });

      throw new Error("Constructor Failure!");
    }
  }

  async createTemplate({
    text,
    html,
  }: {
    text: string;
    html: string;
  }): Promise<void> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.createTemplate.name,
        metadata: {
          text,
          // html,
        },
      });

      this.html = html;
      this.text = text;

      this.logger.log({
        action: "Exit",
        method: this.createTemplate.name,
        metadata: {
          htmlLength: this.html.length,
          textLength: this.text.length,
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.createTemplate.name,
        metadata: {
          text,
          // html,
        },
      });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.createTemplate.name,
        error: error,
        metadata: {
          text,
          // html,
        },
      });

      throw new Error("Failed to create template");
    }
  }

  createTransporter(transportData: {
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    from?: string;
    sender?: string;
    subject: string;
    messageId: string;
    appMetadata: { [key: string]: string } | any;
  }): void {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.createTransporter.name,
        metadata: {
          ...transportData,
        },
      });

      /**
       * host: "smtp.example.com",
       * port: 587,
       * secure: false,
       * service: "gmail",
       */
      this.transporter = nodemailer.createTransport({
        host: transportData.appMetadata.host,
        port: transportData.appMetadata.port,
        secure: transportData.appMetadata.secure,
        service: transportData.appMetadata.service,
        auth: {
          user: transportData.appMetadata.email,
          pass: transportData.appMetadata.password,
        },
        to: transportData.to,
        cc: transportData.cc,
        bcc: transportData.bcc,
        from: transportData.from,
        sender: transportData.sender,
        subject: transportData.subject,
        messageId: transportData.messageId,
        html: this.html,
        text: this.text,
      });

      this.logger.log({
        action: "Exit",
        method: this.createTransporter.name,
        metadata: {
          messageId: transportData.messageId,
          transportDataKeys: Object.keys(transportData),
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.createTransporter.name,
        metadata: {
          ...transportData,
        },
      });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.createTransporter.name,
        error: error,
        metadata: {
          ...transportData,
        },
      });

      throw new Error("Failed to create transporter");
    }
  }

  async verifyConfiguration(): Promise<void> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.verifyConfiguration.name,
      });

      const verification: true = await this.transporter.verify();

      if (!verification) {
        throw new Error("Failed to verify node mailer configuration");
      }

      this.logger.log({
        action: "Exit",
        method: this.verifyConfiguration.name,
        metadata: {
          verification: verification,
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.verifyConfiguration.name,
        metadata: {
          verification: verification,
        },
      });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.verifyConfiguration.name,
        error: error,
      });

      throw new Error("Failed to verify configuration");
    }
  }

  async sendEmail(): Promise<any> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.sendEmail.name,
        metadata: {},
      });

      const result: any = await this.transporter.sendMail({
        date: new Date(),
      });

      this.logger.log({
        action: "Exit",
        method: this.sendEmail.name,
        metadata: {
          result: result,
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.sendEmail.name,
        metadata: {
          result: result,
        },
      });

      return result;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.sendEmail.name,
        error: error,
        metadata: {},
      });

      throw new Error("Failed to send email");
    }
  }
}
