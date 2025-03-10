import { Logger } from "@nestjs/common";
import { InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { EmailServiceDocument } from "@/app/email/services/entities/service.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { EmailServicesService } from "@/app/email/services/services.service";
import {
  insertOneEmailServiceInputSchema,
  InsertOneEmailServiceInputType,
  insertOneEmailServiceOutputSchema,
  InsertOneEmailServiceOutputType,
  insertManyEmailServiceInputSchema,
  InsertManyEmailServiceInputType,
  insertManyEmailServiceOutputSchema,
  InsertManyEmailServiceOutputType,
  findByEmailServiceDataInputSchema,
  FindByEmailServiceDataInputType,
  findByEmailServiceDataOutputSchema,
  FindByEmailServiceDataOutputType,
  findByEmailServiceIdInputSchema,
  FindByEmailServiceIdInputType,
  findByEmailServiceIdOutputSchema,
  FindByEmailServiceIdOutputType,
  findByEmailServiceRefInputSchema,
  FindByEmailServiceRefInputType,
  findByEmailServiceRefOutputSchema,
  FindByEmailServiceRefOutputType,
  updateByEmailServiceIdInputSchema,
  UpdateByEmailServiceIdInputType,
  updateByEmailServiceIdOutputSchema,
  UpdateByEmailServiceIdOutputType,
  updateByEmailServiceDataInputSchema,
  UpdateByEmailServiceDataInputType,
  updateByEmailServiceDataOutputSchema,
  UpdateByEmailServiceDataOutputType,
  deleteByEmailServiceDataInputSchema,
  DeleteByEmailServiceDataInputType,
  deleteByEmailServiceDataOutputSchema,
  DeleteByEmailServiceDataOutputType,
  deleteByEmailServiceRefInputSchema,
  DeleteByEmailServiceRefInputType,
  deleteByEmailServiceRefOutputSchema,
  DeleteByEmailServiceRefOutputType,
  emailServiceSendEmailInputSchema,
  emailServiceSendEmailOutputSchema,
  EmailServiceSendEmailInputType,
  EmailServiceSendEmailOutputType,
} from "../../../../../../libs/trpc/schemas/email/services";
import { ClientsService } from "@/app/clients/clients.service";
import { ClientDocument } from "@/app/clients/entities/client.entity";
import { ClientelesService } from "@/app/clienteles/clienteles.service";
import { ClienteleDocument } from "@/app/clienteles/entities/clientele.entity";
import { DevicesService } from "@/app/devices/devices.service";
import { DeviceDocument } from "@/app/devices/entities/device.entity";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";

@Router({
  alias: "emailServices",
})
@UseMiddlewares(LoggerMiddleware)
export class EmailServicesRouter {
  private logger: Logger = new Logger(EmailServicesRouter.name);

  constructor(
    private readonly emailServicesService: EmailServicesService,
    private readonly clientsService: ClientsService,
    private readonly clientelesService: ClientelesService,
    private readonly devicesService: DevicesService,
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
    input: insertOneEmailServiceInputSchema,
    output: insertOneEmailServiceOutputSchema,
  })
  async insertOne(
    @Input() insertOneEmailServiceInputData: InsertOneEmailServiceInputType,
  ): Promise<InsertOneEmailServiceOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOneEmailServiceInputData,
        },
      });

      const emailService: EmailServiceDocument =
        await this.emailServicesService.insertOne({
          doc: insertOneEmailServiceInputData.doc,
        });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          emailService,
        },
      });

      return insertOneEmailServiceOutputSchema.parse(emailService);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        insertOneEmailServiceInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: insertManyEmailServiceInputSchema,
    output: insertManyEmailServiceOutputSchema,
  })
  async insertMany(
    @Input() insertManyEmailServiceInputData: InsertManyEmailServiceInputType,
  ): Promise<InsertManyEmailServiceOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManyEmailServiceInputData,
        },
      });

      const result: InsertManyResult<any> =
        await this.emailServicesService.insertMany({
          docs: insertManyEmailServiceInputData.docs,
        });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManyEmailServiceOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertMany.name,
        error: error,
        insertManyEmailServiceInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByEmailServiceIdInputSchema,
    output: findByEmailServiceIdOutputSchema,
  })
  async findById(
    @Input() findByEmailServiceIdInputData: FindByEmailServiceIdInputType,
  ): Promise<FindByEmailServiceIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findByEmailServiceIdInputData,
        },
      });

      const [emailService]: EmailServiceDocument[] =
        await this.emailServicesService.find({
          filter: findByEmailServiceIdInputData.filter,
          select: [],
          populate: [],
        });

      this.logger.log({
        action: "Exit",
        method: this.findById.name,
        metadata: {
          emailService,
        },
      });

      return findByEmailServiceIdOutputSchema.parse(emailService);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findById.name,
        error: error,
        findByEmailServiceIdInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByEmailServiceDataInputSchema,
    output: findByEmailServiceDataOutputSchema,
  })
  async findByData(
    @Input() findByEmailServiceDataInputData: FindByEmailServiceDataInputType,
  ): Promise<FindByEmailServiceDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findByEmailServiceDataInputData,
        },
      });

      const filter = query$or(findByEmailServiceDataInputData.filter);

      const emailServices: EmailServiceDocument[] =
        await this.emailServicesService.find({
          filter: filter,
          select: [],
          populate: [],
        });

      this.logger.log({
        action: "Exit",
        method: this.findByData.name,
        metadata: {
          emailServices,
        },
      });

      return findByEmailServiceDataOutputSchema.parse(emailServices);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByData.name,
        error: error,
        findByEmailServiceDataInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByEmailServiceRefInputSchema,
    output: findByEmailServiceRefOutputSchema,
  })
  async findByRef(
    @Input() findByEmailServiceRefInputData: FindByEmailServiceRefInputType,
  ): Promise<FindByEmailServiceRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByRef.name,
        metadata: {
          findByEmailServiceRefInputData,
        },
      });

      const device_ids = concatIds(
        [findByEmailServiceRefInputData.filter.emailService.device_id],
        await this.devicesService.getIds(
          findByEmailServiceRefInputData.filter.device,
        ),
      );
      const client_ids = await this.clientsService.getIds(
        findByEmailServiceRefInputData.filter.client,
      );
      const clientele_ids = await this.clientelesService.getIds(
        findByEmailServiceRefInputData.filter.clientele,
      );
      const user_ids = concatIds(
        [findByEmailServiceRefInputData.filter.emailService.user_id],
        [...client_ids, ...clientele_ids],
      );

      const references_ids = new Map<string, { $in: string[] }>();
      if (device_ids.length > 0) {
        references_ids.set("device_id", {
          $in: device_ids,
        });
      }
      if (user_ids.length > 0) {
        references_ids.set("user_id", {
          $in: user_ids,
        });
      }

      if (
        references_ids.size === 0 &&
        Object.keys(findByEmailServiceRefInputData.filter.emailService)
          .length === 0
      ) {
        this.logger.warn({
          action: "Exit",
          method: this.findByRef.name,
          metadata: {
            references_ids,
            emailService: Object.keys(
              findByEmailServiceRefInputData.filter.emailService,
            ),
          },
        });
        return [];
      }

      if (
        Object.keys(findByEmailServiceRefInputData.filter.client).length > 0
      ) {
        const clients: ClientDocument[] = await this.clientsService.find({
          filter: findByEmailServiceRefInputData.filter.client,
          select: ["_id"],
          populate: [],
        });
        const client_ids = clients.map((client) => client._id.toString());
        const entry = references_ids.get("user_id") || { $in: [] };
        references_ids.set("user_id", {
          $in: [...entry.$in, ...client_ids],
        });
      }

      if (
        Object.keys(findByEmailServiceRefInputData.filter.clientele).length > 0
      ) {
        const clienteles: ClienteleDocument[] =
          await this.clientelesService.find({
            filter: findByEmailServiceRefInputData.filter.clientele,
            select: ["_id"],
            populate: [],
          });

        const clientele_ids = clienteles.map((clientele) =>
          clientele._id.toString(),
        );
        const entry = references_ids.get("user_id") || { $in: [] };
        references_ids.set("user_id", {
          $in: [...entry.$in, ...clientele_ids],
        });
      }

      if (
        Object.keys(findByEmailServiceRefInputData.filter.device).length > 0
      ) {
        const devices: DeviceDocument[] = await this.devicesService.find({
          filter: findByEmailServiceRefInputData.filter.device,
          select: ["_id"],
          populate: [],
        });

        references_ids.set("device_id", {
          $in: devices.map((device) => device._id.toString()),
        });
      }

      if (findByEmailServiceRefInputData.filter.emailService.user_id) {
        const entry = references_ids.get("user_id") || { $in: [] };
        entry.$in.push(
          findByEmailServiceRefInputData.filter.emailService.user_id,
        );
        references_ids.set("user_id", entry);
      }

      if (findByEmailServiceRefInputData.filter.emailService.device_id) {
        const entry = references_ids.get("device_id") || { $in: [] };
        entry.$in.push(
          findByEmailServiceRefInputData.filter.emailService.device_id,
        );
        references_ids.set("device_id", entry);
      }

      const emailServices: EmailServiceDocument[] =
        await this.emailServicesService.find({
          filter: {
            ...findByEmailServiceRefInputData.filter.emailService,
            ...Object.fromEntries(references_ids),
          },
          select: [],
          populate: ["user_id", "device_id"],
        });

      this.logger.log({
        action: "Exit",
        method: this.findByRef.name,
        metadata: {
          emailServices,
        },
      });

      return findByEmailServiceRefOutputSchema.parse(emailServices);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByRef.name,
        error: error,
        findByEmailServiceRefInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByEmailServiceIdInputSchema,
    output: updateByEmailServiceIdOutputSchema,
  })
  async updateById(
    @Input() updateByEmailServiceIdInputData: UpdateByEmailServiceIdInputType,
  ): Promise<UpdateByEmailServiceIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByEmailServiceIdInputData,
        },
      });

      const emailService = await this.emailServicesService.findOneAndUpdate({
        filter: updateByEmailServiceIdInputData.filter,
        update: updateByEmailServiceIdInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          emailService,
        },
      });

      return updateByEmailServiceIdOutputSchema.parse(emailService);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByEmailServiceIdInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByEmailServiceDataInputSchema,
    output: updateByEmailServiceDataOutputSchema,
  })
  async updateByData(
    @Input()
    updateByEmailServiceDataInputData: UpdateByEmailServiceDataInputType,
  ): Promise<UpdateByEmailServiceDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByEmailServiceDataInputData,
        },
      });

      const filter = query$or(updateByEmailServiceDataInputData.filter);

      const result = await this.emailServicesService.updateMany({
        filter: filter,
        update: updateByEmailServiceDataInputData.update,
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

      return updateByEmailServiceDataOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByEmailServiceDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByEmailServiceDataInputSchema,
    output: deleteByEmailServiceDataOutputSchema,
  })
  async deleteByData(
    @Input()
    deleteByEmailServiceDataInputData: DeleteByEmailServiceDataInputType,
  ): Promise<DeleteByEmailServiceDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteByEmailServiceDataInputData,
        },
      });

      const filter = query$or(deleteByEmailServiceDataInputData.filter);

      const delete_count: Number = await this.emailServicesService.delete({
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          delete_count,
        },
      });

      return deleteByEmailServiceDataOutputSchema.parse({ delete_count });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByData.name,
        error: error,
        deleteByEmailServiceDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByEmailServiceRefInputSchema,
    output: deleteByEmailServiceRefOutputSchema,
  })
  async deleteByRef(
    @Input()
    deleteByEmailServiceRefInputData: DeleteByEmailServiceRefInputType,
  ): Promise<DeleteByEmailServiceRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByRef.name,
        metadata: {
          deleteByEmailServiceRefInputData,
        },
      });

      const device_ids = concatIds(
        [deleteByEmailServiceRefInputData.filter.emailService.device_id],
        await this.devicesService.getIds(
          deleteByEmailServiceRefInputData.filter.device,
        ),
      );
      const client_ids = await this.clientsService.getIds(
        deleteByEmailServiceRefInputData.filter.client,
      );
      const clientele_ids = await this.clientelesService.getIds(
        deleteByEmailServiceRefInputData.filter.clientele,
      );
      const user_ids = concatIds(
        [deleteByEmailServiceRefInputData.filter.emailService.user_id],
        [...client_ids, ...clientele_ids],
      );

      const references_ids = new Map<string, { $in: string[] }>();
      if (device_ids.length > 0) {
        references_ids.set("device_id", {
          $in: device_ids,
        });
      }
      if (user_ids.length > 0) {
        references_ids.set("user_id", {
          $in: user_ids,
        });
      }

      if (
        references_ids.size === 0 &&
        Object.keys(deleteByEmailServiceRefInputData.filter.emailService)
          .length === 0
      ) {
        this.logger.warn({
          action: "Exit",
          method: this.deleteByRef.name,
          metadata: {
            references_ids,
            emailService: Object.keys(
              deleteByEmailServiceRefInputData.filter.emailService,
            ),
          },
        });
        return { delete_count: 0 };
      }

      const delete_count: Number = await this.emailServicesService.delete({
        filter: {
          ...deleteByEmailServiceRefInputData.filter.emailService,
          ...Object.fromEntries(references_ids),
        },
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByRef.name,
        metadata: {
          delete_count,
        },
      });

      return deleteByEmailServiceRefOutputSchema.parse({ delete_count });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByRef.name,
        error: error,
        deleteByEmailServiceRefInputData,
      });

      throw error;
    }
  }

  @Query({
    input: emailServiceSendEmailInputSchema,
    output: emailServiceSendEmailOutputSchema,
  })
  async sendEmail(
    @Input()
    emailServiceSendEmailInputData: EmailServiceSendEmailInputType,
  ): Promise<EmailServiceSendEmailOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.sendEmail.name,
        metadata: {
          emailServiceSendEmailInputData,
        },
      });

      const info = await this.emailServicesService.sendEmail(
        emailServiceSendEmailInputData,
      );

      this.logger.log({
        action: "Exit",
        method: this.sendEmail.name,
        metadata: { message_id: info.messageId },
      });

      return info;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.sendEmail.name,
        error: error,
        emailServiceSendEmailInputData,
      });

      throw error;
    }
  }
}
