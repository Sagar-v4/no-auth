import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";

import { EMAIL_SERVICE_SCHEMA_NAME } from "@/app/email/services/entities/service.entity";
import { EnvService } from "@/env/env.service";

@Injectable()
export class EmailServicesV1Service {
  private transporter!: nodemailer.Transporter;
  private logger: Logger = new Logger(EmailServicesV1Service.name);

  constructor(private readonly envService: EnvService) {
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
          user: this.envService.get("SYS_GMAIL_USER"),
          pass: this.envService.get("SYS_GMAIL_PASS"),
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
        from:
          input.from ?? `no-reply <${this.envService.get("SYS_GMAIL_USER")}>`,
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
