import { Logger } from "@nestjs/common";
import { InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { DevicesService } from "@/app/devices/devices.service";
import { DeviceDocument, STATUS } from "@/app/devices/entities/device.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import {
  insertOneDeviceInputSchema,
  InsertOneDeviceInputType,
  insertOneDeviceOutputSchema,
  InsertOneDeviceOutputType,
} from "../../../../../libs/trpc/schemas/devices/insert-one.schema";
import {
  insertManyDeviceInputSchema,
  InsertManyDeviceInputType,
  insertManyDeviceOutputSchema,
  InsertManyDeviceOutputType,
} from "../../../../../libs/trpc/schemas/devices/insert-many.schema";
import {
  findByDeviceIdInputSchema,
  FindByDeviceIdInputType,
  findByDeviceIdOutputSchema,
  FindByDeviceIdOutputType,
} from "../../../../../libs/trpc/schemas/devices/find-by-id.schema";
import {
  findByDeviceDataInputSchema,
  FindByDeviceDataInputType,
  findByDeviceDataOutputSchema,
  FindByDeviceDataOutputType,
} from "../../../../../libs/trpc/schemas/devices/find-by-data.schema";
import {
  updateByDeviceIdInputSchema,
  UpdateByDeviceIdInputType,
  updateByDeviceIdOutputSchema,
  UpdateByDeviceIdOutputType,
} from "../../../../../libs/trpc/schemas/devices/update-by-id.schema";
import {
  updateByDeviceDataInputSchema,
  UpdateByDeviceDataInputType,
  updateByDeviceDataOutputSchema,
  UpdateByDeviceDataOutputType,
} from "../../../../../libs/trpc/schemas/devices/update-by-data.schema";
import {
  deleteByDeviceDataInputSchema,
  DeleteByDeviceDataInputType,
  deleteByDeviceDataOutputSchema,
  DeleteByDeviceDataOutputType,
} from "../../../../../libs/trpc/schemas/devices/delete-by-data.schema";
import { query$or } from "@/utils/query-builder";

@Router({
  alias: "devices",
})
@UseMiddlewares(LoggerMiddleware)
export class DevicesRouter {
  private logger: Logger = new Logger(DevicesRouter.name);

  constructor(private readonly devicesService: DevicesService) {
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
    input: insertOneDeviceInputSchema,
    output: insertOneDeviceOutputSchema,
  })
  async insertOne(
    @Input() insertOneDeviceInputData: InsertOneDeviceInputType,
  ): Promise<InsertOneDeviceOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOneDeviceInputData,
        },
      });

      const device: DeviceDocument = await this.devicesService.insertOne({
        doc: insertOneDeviceInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          device,
        },
      });

      return insertOneDeviceOutputSchema.parse(device);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        insertOneDeviceInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: insertManyDeviceInputSchema,
    output: insertManyDeviceOutputSchema,
  })
  async insertMany(
    @Input() insertManyDeviceInputData: InsertManyDeviceInputType,
  ): Promise<InsertManyDeviceOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManyDeviceInputData,
        },
      });

      const result: InsertManyResult<any> =
        await this.devicesService.insertMany({
          docs: insertManyDeviceInputData.docs,
        });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManyDeviceOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertMany.name,
        error: error,
        insertManyDeviceInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByDeviceIdInputSchema,
    output: findByDeviceIdOutputSchema,
  })
  async findById(
    @Input() findByDeviceIdInputData: FindByDeviceIdInputType,
  ): Promise<FindByDeviceIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findByDeviceIdInputData,
        },
      });

      const [device]: DeviceDocument[] = await this.devicesService.find({
        filter: findByDeviceIdInputData.filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findById.name,
        metadata: {
          device,
        },
      });

      return findByDeviceIdOutputSchema.parse(device);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findById.name,
        error: error,
        findByDeviceIdInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByDeviceDataInputSchema,
    output: findByDeviceDataOutputSchema,
  })
  async findByData(
    @Input() findByDeviceDataInputData: FindByDeviceDataInputType,
  ): Promise<FindByDeviceDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findByDeviceDataInputData,
        },
      });

      const filter = query$or(findByDeviceDataInputData.filter);

      const devices: DeviceDocument[] = await this.devicesService.find({
        filter: filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByData.name,
        metadata: {
          devices,
        },
      });

      return findByDeviceDataOutputSchema.parse(devices);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByData.name,
        error: error,
        findByDeviceDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByDeviceIdInputSchema,
    output: updateByDeviceIdOutputSchema,
  })
  async updateById(
    @Input() updateByDeviceIdInputData: UpdateByDeviceIdInputType,
  ): Promise<UpdateByDeviceIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByDeviceIdInputData,
        },
      });

      const device = await this.devicesService.findOneAndUpdate({
        filter: updateByDeviceIdInputData.filter,
        update: updateByDeviceIdInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          device,
        },
      });

      return updateByDeviceIdOutputSchema.parse(device);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByDeviceIdInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByDeviceDataInputSchema,
    output: updateByDeviceDataOutputSchema,
  })
  async updateByData(
    @Input() updateByDeviceDataInputData: UpdateByDeviceDataInputType,
  ): Promise<UpdateByDeviceDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByDeviceDataInputData,
        },
      });

      const filter = query$or(updateByDeviceDataInputData.filter);

      const device = await this.devicesService.updateMany({
        filter: filter,
        update: updateByDeviceDataInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          device,
        },
      });

      return updateByDeviceDataOutputSchema.parse(device);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByDeviceDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByDeviceDataInputSchema,
    output: deleteByDeviceDataOutputSchema,
  })
  async deleteByData(
    @Input() deleteByDeviceDataInputData: DeleteByDeviceDataInputType,
  ): Promise<DeleteByDeviceDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteByDeviceDataInputData,
        },
      });

      const filter = query$or(deleteByDeviceDataInputData.filter);

      const delete_count: Number = await this.devicesService.delete({
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          delete_count,
        },
      });

      return deleteByDeviceDataOutputSchema.parse({ delete_count });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByData.name,
        error: error,
        deleteByDeviceDataInputData,
      });

      throw error;
    }
  }
}
