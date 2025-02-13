import { Injectable, Logger } from "@nestjs/common";
import { otp as blueprintOTP } from "@/app/email/templates/blueprints/otp";

@Injectable()
export class EmailTemplatesService {
  private logger: Logger = new Logger(EmailTemplatesService.name);

  constructor() {
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

  generateTemplateOTP({ otp }: { otp: string }): {
    html: string;
    text: string;
  } {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.generateTemplateOTP.name,
        metadata: {
          otp,
        },
      });

      const html: string = blueprintOTP(otp);
      const text: string = `Your OTP: ${otp}`;

      this.logger.log({
        action: "Exit",
        method: this.generateTemplateOTP.name,
        metadata: {
          htmlLen: html.length,
          textLen: text.length,
        },
      });

      this.logger.debug({
        action: "Exit",
        method: this.generateTemplateOTP.name,
        metadata: {
          otp,
          // html,
          text,
        },
      });

      return { html, text };
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.generateTemplateOTP.name,
        error: error,
        metadata: {
          otp,
        },
      });

      throw new Error("Failed to generate otp template");
    }
  }
}
