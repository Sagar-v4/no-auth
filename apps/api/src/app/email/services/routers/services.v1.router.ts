import { Logger } from "@nestjs/common";
import { DeleteResult, InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { EmailServiceDocument } from "@/app/email/services/entities/service.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { EmailServicesV1Service } from "@/app/email/services/services/services.v1.service";
import {
  insertOneEmailServiceInput,
  InsertOneEmailServiceInput,
  insertOneEmailServiceOutput,
  InsertOneEmailServiceOutput,
  insertManyEmailServiceInput,
  InsertManyEmailServiceInput,
  insertManyEmailServiceOutput,
  InsertManyEmailServiceOutput,
  findByEmailServiceDataInput,
  FindByEmailServiceDataInput,
  findByEmailServiceDataOutput,
  FindByEmailServiceDataOutput,
  findByEmailServiceIdInput,
  FindByEmailServiceIdInput,
  findByEmailServiceIdOutput,
  FindByEmailServiceIdOutput,
  findByEmailServiceRefInput,
  FindByEmailServiceRefInput,
  findByEmailServiceRefOutput,
  FindByEmailServiceRefOutput,
  updateByEmailServiceIdInput,
  UpdateByEmailServiceIdInput,
  updateByEmailServiceIdOutput,
  UpdateByEmailServiceIdOutput,
  updateByEmailServiceDataInput,
  UpdateByEmailServiceDataInput,
  updateByEmailServiceDataOutput,
  UpdateByEmailServiceDataOutput,
  deleteByEmailServiceDataInput,
  DeleteByEmailServiceDataInput,
  deleteByEmailServiceDataOutput,
  DeleteByEmailServiceDataOutput,
  deleteByEmailServiceRefInput,
  DeleteByEmailServiceRefInput,
  deleteByEmailServiceRefOutput,
  DeleteByEmailServiceRefOutput,
} from "../../../../../../../libs/trpc/schemas/v1/email/services";
import { UserDocument } from "@/app/users/entities/user.entity";
import { DeviceDocument } from "@/app/devices/entities/device.entity";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";
import { BasicService } from "@/app/basic/basic.service";

@Router({
  alias: "emailServicesV1",
})
@UseMiddlewares(LoggerMiddleware)
export class EmailServicesV1Router {
  private logger: Logger = new Logger(EmailServicesV1Router.name);

  constructor(
    private readonly emailServicesService: EmailServicesV1Service,
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
    input: insertOneEmailServiceInput,
    output: insertOneEmailServiceOutput,
  })
  async insertOne(
    @Input() insertOneEmailServiceInputData: InsertOneEmailServiceInput,
  ): Promise<InsertOneEmailServiceOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOneEmailServiceInputData,
        },
      });

      const emailService: EmailServiceDocument =
        await this.basicService.insertOne({
          schema: "Email_Service",
          doc: insertOneEmailServiceInputData.doc,
        });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          emailService,
        },
      });

      return insertOneEmailServiceOutput.parse(emailService);
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
    input: insertManyEmailServiceInput,
    output: insertManyEmailServiceOutput,
  })
  async insertMany(
    @Input() insertManyEmailServiceInputData: InsertManyEmailServiceInput,
  ): Promise<InsertManyEmailServiceOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManyEmailServiceInputData,
        },
      });

      const result: InsertManyResult<any> = await this.basicService.insertMany({
        schema: "Email_Service",
        doc: insertManyEmailServiceInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManyEmailServiceOutput.parse(result);
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
    input: findByEmailServiceIdInput,
    output: findByEmailServiceIdOutput,
  })
  async findById(
    @Input() findByEmailServiceIdInputData: FindByEmailServiceIdInput,
  ): Promise<FindByEmailServiceIdOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findByEmailServiceIdInputData,
        },
      });

      const [emailService]: EmailServiceDocument[] =
        await this.basicService.find({
          schema: "Email_Service",
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

      return findByEmailServiceIdOutput.parse(emailService);
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
    input: findByEmailServiceDataInput,
    output: findByEmailServiceDataOutput,
  })
  async findByData(
    @Input() findByEmailServiceDataInputData: FindByEmailServiceDataInput,
  ): Promise<FindByEmailServiceDataOutput> {
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
        await this.basicService.find({
          schema: "Email_Service",
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

      return findByEmailServiceDataOutput.parse(emailServices);
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
    input: findByEmailServiceRefInput,
    output: findByEmailServiceRefOutput,
  })
  async findByRef(
    @Input() findByEmailServiceRefInputData: FindByEmailServiceRefInput,
  ): Promise<FindByEmailServiceRefOutput> {
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
        await this.basicService.getIds({
          schema: "Device",
          filter: findByEmailServiceRefInputData.filter.device,
        }),
      );
      const user_ids = concatIds(
        [findByEmailServiceRefInputData.filter.emailService.user_id],
        await this.basicService.getIds({
          schema: "User",
          filter: findByEmailServiceRefInputData.filter.user,
        }),
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

      if (Object.keys(findByEmailServiceRefInputData.filter.user).length > 0) {
        const users: UserDocument[] = await this.basicService.find({
          schema: "User",
          filter: findByEmailServiceRefInputData.filter.user,
          select: ["_id"],
          populate: [],
        });

        references_ids.set("user_id", {
          $in: users.map((user) => user._id.toString()),
        });
      }

      if (
        Object.keys(findByEmailServiceRefInputData.filter.device).length > 0
      ) {
        const devices: DeviceDocument[] = await this.basicService.find({
          schema: "Device",
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
        await this.basicService.find({
          schema: "Email_Service",
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

      return findByEmailServiceRefOutput.parse(emailServices);
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
    input: updateByEmailServiceIdInput,
    output: updateByEmailServiceIdOutput,
  })
  async updateById(
    @Input() updateByEmailServiceIdInputData: UpdateByEmailServiceIdInput,
  ): Promise<UpdateByEmailServiceIdOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByEmailServiceIdInputData,
        },
      });

      const emailService = await this.basicService.findOneAndUpdate({
        schema: "Email_Service",
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

      return updateByEmailServiceIdOutput.parse(emailService);
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
    input: updateByEmailServiceDataInput,
    output: updateByEmailServiceDataOutput,
  })
  async updateByData(
    @Input()
    updateByEmailServiceDataInputData: UpdateByEmailServiceDataInput,
  ): Promise<UpdateByEmailServiceDataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByEmailServiceDataInputData,
        },
      });

      const filter = query$or(updateByEmailServiceDataInputData.filter);

      const result = await this.basicService.updateMany({
        schema: "Email_Service",
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

      return updateByEmailServiceDataOutput.parse(result);
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
    input: deleteByEmailServiceDataInput,
    output: deleteByEmailServiceDataOutput,
  })
  async deleteByData(
    @Input()
    deleteByEmailServiceDataInputData: DeleteByEmailServiceDataInput,
  ): Promise<DeleteByEmailServiceDataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteByEmailServiceDataInputData,
        },
      });

      const filter = query$or(deleteByEmailServiceDataInputData.filter);

      const result: DeleteResult = await this.basicService.delete({
        schema: "Email_Service",
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          result,
        },
      });

      return deleteByEmailServiceDataOutput.parse(result);
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
    input: deleteByEmailServiceRefInput,
    output: deleteByEmailServiceRefOutput,
  })
  async deleteByRef(
    @Input()
    deleteByEmailServiceRefInputData: DeleteByEmailServiceRefInput,
  ): Promise<DeleteByEmailServiceRefOutput> {
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
        await this.basicService.getIds({
          schema: "Device",
          filter: deleteByEmailServiceRefInputData.filter.device,
        }),
      );
      const user_ids = concatIds(
        [deleteByEmailServiceRefInputData.filter.emailService.user_id],
        await this.basicService.getIds({
          schema: "User",
          filter: deleteByEmailServiceRefInputData.filter.user,
        }),
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

      const result: DeleteResult = await this.basicService.delete({
        schema: "Email_Service",
        filter: {
          ...deleteByEmailServiceRefInputData.filter.emailService,
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

      return deleteByEmailServiceRefOutput.parse(result);
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
}
