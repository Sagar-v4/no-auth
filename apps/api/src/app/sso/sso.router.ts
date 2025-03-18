import { Logger } from "@nestjs/common";
import { DeleteResult, InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { SSODocument } from "@/app/sso/entities/sso.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { SSOService } from "@/app/sso/sso.service";
import {
  insertOneSSOInputSchema,
  InsertOneSSOInputType,
  insertOneSSOOutputSchema,
  InsertOneSSOOutputType,
  insertManySSOInputSchema,
  InsertManySSOInputType,
  insertManySSOOutputSchema,
  InsertManySSOOutputType,
  findBySSODataInputSchema,
  FindBySSODataInputType,
  findBySSODataOutputSchema,
  FindBySSODataOutputType,
  findBySSOIdInputSchema,
  FindBySSOIdInputType,
  findBySSOIdOutputSchema,
  FindBySSOIdOutputType,
  findBySSORefInputSchema,
  FindBySSORefInputType,
  findBySSORefOutputSchema,
  FindBySSORefOutputType,
  updateBySSOIdInputSchema,
  UpdateBySSOIdInputType,
  updateBySSOIdOutputSchema,
  UpdateBySSOIdOutputType,
  updateBySSODataInputSchema,
  UpdateBySSODataInputType,
  updateBySSODataOutputSchema,
  UpdateBySSODataOutputType,
  deleteBySSODataInputSchema,
  DeleteBySSODataInputType,
  deleteBySSODataOutputSchema,
  DeleteBySSODataOutputType,
  deleteBySSORefInputSchema,
  DeleteBySSORefInputType,
  deleteBySSORefOutputSchema,
  DeleteBySSORefOutputType,
  sendEmailOTPSSOInputSchema,
  SendEmailOTPSSOInputType,
  sendEmailOTPSSOOutputSchema,
  SendEmailOTPSSOOutputType,
  verifyEmailOTPSSOInputSchema,
  VerifyEmailOTPSSOInputType,
  verifyEmailOTPSSOOutputSchema,
  VerifyEmailOTPSSOOutputType,
} from "../../../../../libs/trpc/schemas/sso";
import { ClientsService } from "@/app/clients/clients.service";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";
import { generateOTP } from "@/utils/otp-generator";
import { EmailServicesService } from "@/app/email/services/services.service";
import { DevicesService } from "@/app/devices/devices.service";
import { EmailServiceDocument } from "@/app/email/services/entities/service.entity";
import { DeviceDocument } from "@/app/devices/entities/device.entity";
import {
  CLIENTELE_SCHEMA_NAME,
  ClienteleDocument,
} from "@/app/clienteles/entities/clientele.entity";
import {
  CLIENT_SCHEMA_NAME,
  ClientDocument,
} from "@/app/clients/entities/client.entity";
import { generateEmailID } from "@/utils/clientele-id-generator";
import { ClientelesService } from "@/app/clienteles/clienteles.service";
import { BasicService } from "@/app/basic/basic.service";

@Router({
  alias: "sso",
})
@UseMiddlewares(LoggerMiddleware)
export class SSORouter {
  private logger: Logger = new Logger(SSORouter.name);

  constructor(
    private readonly ssoService: SSOService,
    private readonly emailServicesService: EmailServicesService,
    private readonly basicService: BasicService,
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

  @Mutation({
    input: insertOneSSOInputSchema,
    output: insertOneSSOOutputSchema,
  })
  async insertOne(
    @Input() insertOneSSOInputData: InsertOneSSOInputType,
  ): Promise<InsertOneSSOOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOneSSOInputData,
        },
      });

      const sso: SSODocument = await this.basicService.insertOne({
        schema: "SSO",
        doc: insertOneSSOInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          sso,
        },
      });

      return insertOneSSOOutputSchema.parse(sso);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        insertOneSSOInputData,
      });

      throw error;
    }
  }
  @Mutation({
    input: insertManySSOInputSchema,
    output: insertManySSOOutputSchema,
  })
  async insertMany(
    @Input() insertManySSOInputData: InsertManySSOInputType,
  ): Promise<InsertManySSOOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManySSOInputData,
        },
      });

      const result: InsertManyResult<any> = await this.basicService.insertMany({
        schema: "SSO",
        doc: insertManySSOInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManySSOOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertMany.name,
        error: error,
        insertManySSOInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findBySSOIdInputSchema,
    output: findBySSOIdOutputSchema,
  })
  async findById(
    @Input() findBySSOIdInputData: FindBySSOIdInputType,
  ): Promise<FindBySSOIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findBySSOIdInputData,
        },
      });

      const [sso]: SSODocument[] = await this.basicService.find({
        schema: "SSO",
        filter: findBySSOIdInputData.filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findById.name,
        metadata: {
          sso,
        },
      });

      return findBySSOIdOutputSchema.parse(sso);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findById.name,
        error: error,
        findBySSOIdInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findBySSODataInputSchema,
    output: findBySSODataOutputSchema,
  })
  async findByData(
    @Input() findBySSODataInputData: FindBySSODataInputType,
  ): Promise<FindBySSODataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findBySSODataInputData,
        },
      });

      const filter = query$or(findBySSODataInputData.filter);

      const sso: SSODocument[] = await this.basicService.find({
        schema: "SSO",
        filter: filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByData.name,
        metadata: {
          sso,
        },
      });

      return findBySSODataOutputSchema.parse(sso);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByData.name,
        error: error,
        findBySSODataInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findBySSORefInputSchema,
    output: findBySSORefOutputSchema,
  })
  async findByRef(
    @Input() findBySSORefInputData: FindBySSORefInputType,
  ): Promise<FindBySSORefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByRef.name,
        metadata: {
          findBySSORefInputData,
        },
      });

      const client_ids = concatIds(
        [findBySSORefInputData.filter.sso.client_id],
        await this.basicService.getIds({
          schema: "Client",
          filter: findBySSORefInputData.filter.client,
        }),
      );
      const organization_ids = concatIds(
        [findBySSORefInputData.filter.sso.organization_id],
        await this.basicService.getIds({
          schema: "Organization",
          filter: findBySSORefInputData.filter.organization,
        }),
      );

      const references_ids = new Map<string, { $in: string[] }>();
      if (client_ids.length > 0) {
        references_ids.set("client_id", {
          $in: client_ids,
        });
      }
      if (organization_ids.length > 0) {
        references_ids.set("organization_id", {
          $in: organization_ids,
        });
      }

      if (
        references_ids.size === 0 &&
        Object.keys(findBySSORefInputData.filter.sso).length === 0
      ) {
        this.logger.warn({
          action: "Exit",
          method: this.findByRef.name,
          metadata: {
            references_ids,
            key: Object.keys(findBySSORefInputData.filter.sso),
          },
        });
        return [];
      }

      const sso: SSODocument[] = await this.basicService.find({
        schema: "SSO",
        filter: {
          ...findBySSORefInputData.filter.sso,
          ...Object.fromEntries(references_ids),
        },
        select: [],
        populate: ["client_id", "organization_id"],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByRef.name,
        metadata: {
          sso,
        },
      });

      return findBySSORefOutputSchema.parse(sso);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByRef.name,
        error: error,
        findBySSORefInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateBySSOIdInputSchema,
    output: updateBySSOIdOutputSchema,
  })
  async updateById(
    @Input() updateBySSOIdInputData: UpdateBySSOIdInputType,
  ): Promise<UpdateBySSOIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateBySSOIdInputData,
        },
      });

      const sso = await this.basicService.findOneAndUpdate({
        schema: "SSO",
        filter: updateBySSOIdInputData.filter,
        update: updateBySSOIdInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          sso,
        },
      });

      return updateBySSOIdOutputSchema.parse(sso);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateBySSOIdInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateBySSODataInputSchema,
    output: updateBySSODataOutputSchema,
  })
  async updateByData(
    @Input()
    updateBySSODataInputData: UpdateBySSODataInputType,
  ): Promise<UpdateBySSODataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateBySSODataInputData,
        },
      });

      const filter = query$or(updateBySSODataInputData.filter);

      const result = await this.basicService.updateMany({
        schema: "SSO",
        filter: filter,
        update: updateBySSODataInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          result,
        },
      });

      return updateBySSODataOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateBySSODataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteBySSODataInputSchema,
    output: deleteBySSODataOutputSchema,
  })
  async deleteByData(
    @Input()
    deleteBySSODataInputData: DeleteBySSODataInputType,
  ): Promise<DeleteBySSODataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteBySSODataInputData,
        },
      });

      const filter = query$or(deleteBySSODataInputData.filter);

      const result: DeleteResult = await this.basicService.delete({
        schema: "SSO",
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          result,
        },
      });

      return deleteBySSODataOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByData.name,
        error: error,
        deleteBySSODataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteBySSORefInputSchema,
    output: deleteBySSORefOutputSchema,
  })
  async deleteByRef(
    @Input()
    deleteBySSORefInputData: DeleteBySSORefInputType,
  ): Promise<DeleteBySSORefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByRef.name,
        metadata: {
          deleteBySSORefInputData,
        },
      });

      const client_ids = concatIds(
        [deleteBySSORefInputData.filter.sso.client_id],
        await this.basicService.getIds({
          schema: "Client",
          filter: deleteBySSORefInputData.filter.client,
        }),
      );
      const organization_ids = concatIds(
        [deleteBySSORefInputData.filter.sso.organization_id],
        await this.basicService.getIds({
          schema: "Organization",
          filter: deleteBySSORefInputData.filter.organization,
        }),
      );

      const references_ids = new Map<string, { $in: string[] }>();
      if (client_ids.length > 0) {
        references_ids.set("client_id", {
          $in: client_ids,
        });
      }
      if (organization_ids.length > 0) {
        references_ids.set("organization_id", {
          $in: organization_ids,
        });
      }

      const result: DeleteResult = await this.basicService.delete({
        schema: "SSO",
        filter: {
          ...deleteBySSORefInputData.filter.sso,
          ...Object.fromEntries(references_ids),
        },
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByRef.name,
        metadata: {
          result,
        },
      });

      return deleteBySSORefOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByRef.name,
        error: error,
        deleteBySSORefInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: sendEmailOTPSSOInputSchema,
    output: sendEmailOTPSSOOutputSchema,
  })
  async sendEmailOTP(
    @Input()
    sendEmailOTPSSOInputData: SendEmailOTPSSOInputType,
  ): Promise<SendEmailOTPSSOOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.sendEmailOTP.name,
        metadata: {
          sendEmailOTPSSOInputData,
        },
      });

      const user_type = sendEmailOTPSSOInputData.sso_uuid
        ? CLIENTELE_SCHEMA_NAME
        : CLIENT_SCHEMA_NAME;

      let user_id: string;

      if (sendEmailOTPSSOInputData.sso_uuid) {
        const [sso] = await this.findByRef({
          filter: {
            client: {},
            organization: {},
            sso: {
              uuid: sendEmailOTPSSOInputData.sso_uuid,
            },
          },
        });

        const [clientele]: ClienteleDocument[] = await this.basicService.find({
          schema: "Clientele",
          filter: {
            email: sendEmailOTPSSOInputData.email,
            organization_id: sso.organization_id._id,
          },
          populate: [],
          select: ["_id"],
        });

        if (!clientele) {
          const newClientele = await this.basicService.insertOne({
            schema: "Clientele",
            doc: {
              organization_id: sso.organization_id._id,
              email: sendEmailOTPSSOInputData.email,
            },
          });
          user_id = newClientele._id.toString();
        } else {
          user_id = clientele._id.toString();
        }
      } else {
        const [client]: ClientDocument[] = await this.basicService.find({
          schema: "Client",
          filter: {
            email: sendEmailOTPSSOInputData.email,
          },
          populate: [],
          select: ["_id"],
        });

        if (!client) {
          const newClient = await this.basicService.insertOne({
            schema: "Client",
            doc: {
              email: sendEmailOTPSSOInputData.email,
              name: sendEmailOTPSSOInputData.email.split("@")[0],
            },
          });
          user_id = newClient._id.toString();
        } else {
          user_id = client._id.toString();
        }
      }

      const otp = generateOTP(6);

      const emailResponse = await this.emailServicesService.sendEmail({
        to: [sendEmailOTPSSOInputData.email],
        subject: "One-Time Password (OTP)",
        text: `Your one-time password (OTP) is: ${otp}`,
      });

      const [device]: DeviceDocument[] = await this.basicService.find({
        schema: "Device",
        filter: {
          uuid: sendEmailOTPSSOInputData.device_uuid,
        },
        populate: [],
        select: ["uuid"],
      });

      const email_service: EmailServiceDocument =
        await this.basicService.insertOne({
          schema: "Email_Service",
          doc: {
            user_id: user_id,
            user_type: user_type,
            device_id: device.uuid,
            metadata: {
              otp: otp,
              ...emailResponse,
            },
          },
        });

      const service_id = email_service.uuid;

      this.logger.log({
        action: "Exit",
        method: this.sendEmailOTP.name,
        metadata: {
          service_id,
        },
      });

      return sendEmailOTPSSOOutputSchema.parse({ service_id });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.sendEmailOTP.name,
        error: error,
        sendEmailOTPSSOInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: verifyEmailOTPSSOInputSchema,
    output: verifyEmailOTPSSOOutputSchema,
  })
  async verifyEmailOTP(
    @Input()
    verifyEmailOTPSSOInputData: VerifyEmailOTPSSOInputType,
  ): Promise<VerifyEmailOTPSSOOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.verifyEmailOTP.name,
        metadata: {
          verifyEmailOTPSSOInputData,
        },
      });

      const [email_service]: EmailServiceDocument[] =
        await this.basicService.find({
          schema: "Email_Service",
          filter: {
            uuid: verifyEmailOTPSSOInputData.service_id,
          },
          populate: [],
          select: ["metadata.otp"],
        });

      const is_otp_correct =
        (email_service?.metadata as any)?.otp == verifyEmailOTPSSOInputData.otp;

      this.logger.log({
        action: "Exit",
        method: this.verifyEmailOTP.name,
        metadata: {
          is_otp_correct,
        },
      });

      return verifyEmailOTPSSOOutputSchema.parse({ is_otp_correct });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.verifyEmailOTP.name,
        error: error,
        verifyEmailOTPSSOInputData,
      });

      throw error;
    }
  }
}
