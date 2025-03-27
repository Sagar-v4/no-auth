import { Body, Controller, Logger, Post, Req, Res } from "@nestjs/common";
import { SSOV1Service } from "@/app/sso/services/sso.v1.service";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { zodToOpenAPI } from "nestjs-zod";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  SecretSendInput,
  secretSendInput,
  SecretSendOutput,
  secretSendOutput,
  secretVerifyInput,
  SecretVerifyInput,
  secretVerifyOutput,
} from "@/lib/trpc/schemas/v1/sso";
import { BasicService } from "@/app/basic/basic.service";
import { LoginMethodsEnum } from "@/lib/trpc/schemas/v1/users";
import { generateSecret } from "@/utils/secret-generator";
import { EmailServicesV1Service } from "@/app/email/services/services/services.v1.service";
import { EnvService } from "@/env/env.service";
import { generateEmailTemplate } from "@/utils/email-template-generator";
import { Metadata } from "@/lib/trpc/schemas/v1/email/services";
import {
  Organization,
  OrganizationDocument,
} from "@/app/organizations/entities/organization.entity";

@Controller({
  path: "sso",
  version: "1",
})
export class SSOV1Controller {
  private logger: Logger = new Logger(SSOV1Controller.name);

  constructor(
    private readonly ssoService: SSOV1Service,
    private readonly basicService: BasicService,
    private readonly emailServicesService: EmailServicesV1Service,
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

  @Post("secret/send")
  @ApiBody({
    schema: zodToOpenAPI(secretSendInput),
  })
  @ApiResponse({
    status: 201,
    schema: zodToOpenAPI(secretSendOutput),
  })
  async sendSecret(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) res: FastifyReply,
    @Body() secretSendData: SecretSendInput,
  ) {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.sendSecret.name,
        metadata: {
          secretSendData,
        },
      });

      const device_uuid = req.cookies["_DID"];
      if (!device_uuid) {
        throw new Error("No device_uuid");
      }

      const [device] = await this.basicService.find({
        schema: "Device",
        filter: {
          uuid: device_uuid,
        },
        populate: [],
        select: [],
      });

      const [sso] = await this.basicService.find({
        schema: "SSO",
        filter: {
          uuid: secretSendData.sso_uuid,
        },
        populate: ["organization_id"],
        select: [],
      });

      let [user] = await this.basicService.find({
        schema: "User",
        filter: {
          email: secretSendData.email,
          organization_uuid: (
            sso.organization_id as unknown as OrganizationDocument
          ).uuid,
        },
        populate: [],
        select: [],
      });

      if (!user) {
        user = await this.basicService.insertOne({
          schema: "User",
          doc: {
            email: secretSendData.email,
            name: secretSendData.email.split("@")[0],
            organization_uuid: (
              sso.organization_id as unknown as OrganizationDocument
            ).uuid,
            login_method: sso.login_method as LoginMethodsEnum,

            // TODO: add roles as per sso
            // roles: [NO_AUTH_USER_ROLES_ENUM.Enum.CLIENT],
          },
        });

        if (this.envService.get("SYS_SSO_UUID") !== sso.uuid) {
          // TODO: send new user data to webhook via sso service function
        }
      }

      const email_service = await this.basicService.insertOne({
        schema: "Email_Service",
        doc: {
          user_id: user._id.toString(),
          user_uuid: user.uuid,
          device_id: device._id.toString(),
          device_uuid: device.uuid,
          organization_id: (
            sso.organization_id as unknown as OrganizationDocument
          )._id.toString(),
          sso_id: sso._id.toString(),
          sso_uuid: sso.uuid,
        },
      });

      const secret = generateSecret(user.login_method as LoginMethodsEnum);

      const email_template = generateEmailTemplate(
        user.login_method as LoginMethodsEnum,
        secret,
        this.envService.get("SYS_SSO_URL"),
        email_service.uuid,
      );

      const emailResponse = await this.emailServicesService.sendEmail({
        to: [secretSendData.email],
        ...email_template,
      });

      const email_service_update = await this.basicService.findOneAndUpdate({
        schema: "Email_Service",
        filter: {
          _id: email_service._id,
        },
        update: {
          metadata: {
            secret: secret,
            ...emailResponse,
          },
        },
        populate: [],
        select: ["uuid"],
      });

      const data: SecretSendOutput = {
        email_service_uuid: email_service_update.uuid,
        login_method: user.login_method as LoginMethodsEnum,
      };

      this.logger.log({
        action: "Exit",
        method: this.sendSecret.name,
        metadata: {
          data,
        },
      });

      return secretSendOutput.parse(data);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.sendSecret.name,
        error: error,
        secretSendData,
      });

      throw error;
    }
  }

  @Post("secret/verify")
  @ApiBody({
    schema: zodToOpenAPI(secretVerifyInput),
  })
  @ApiResponse({
    status: 201,
    schema: zodToOpenAPI(secretVerifyOutput),
  })
  async verifySecret(@Body() body: SecretVerifyInput) {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.verifySecret.name,
        metadata: {
          body,
        },
      });

      const [email_service] = await this.basicService.find({
        schema: "Email_Service",
        filter: {
          uuid: body.email_service_uuid,
        },
        populate: [],
        select: [],
      });

      const is_valid_secret =
        (email_service.metadata as Metadata).secret === body.secret;

      this.logger.log({
        action: "Exit",
        method: this.verifySecret.name,
        metadata: {
          is_valid_secret: is_valid_secret,
          email_service_uuid: body.email_service_uuid,
          sso_uuid: email_service.sso_uuid,
          user_uuid: email_service.user_id,
          device_id: email_service.device_id,
          organization_id: email_service.organization_id,
        },
      });

      return secretVerifyOutput.parse({
        is_valid_secret: is_valid_secret,
        user_uuid: email_service.user_uuid,
      });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.sendSecret.name,
        error: error,
        body,
      });

      return secretVerifyOutput.parse({
        is_valid_secret: false,
      });
    }
  }
}
