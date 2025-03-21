import { Logger } from "@nestjs/common";
import { DeleteResult, InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { DevicesV1Service } from "@/app/devices/services/devices.v1.service";
import { DeviceDocument } from "@/app/devices/entities/device.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import {
  insertOneDeviceInput,
  InsertOneDeviceInput,
  insertOneDeviceOutput,
  InsertOneDeviceOutput,
  insertManyDeviceInput,
  InsertManyDeviceInput,
  insertManyDeviceOutput,
  InsertManyDeviceOutput,
  findByDeviceIdInput,
  FindByDeviceIdInput,
  findByDeviceIdOutput,
  FindByDeviceIdOutput,
  findByDeviceDataInput,
  FindByDeviceDataInput,
  findByDeviceDataOutput,
  FindByDeviceDataOutput,
  updateByDeviceIdInput,
  UpdateByDeviceIdInput,
  updateByDeviceIdOutput,
  UpdateByDeviceIdOutput,
  updateByDeviceDataInput,
  UpdateByDeviceDataInput,
  updateByDeviceDataOutput,
  UpdateByDeviceDataOutput,
  deleteByDeviceDataInput,
  DeleteByDeviceDataInput,
  deleteByDeviceDataOutput,
  DeleteByDeviceDataOutput,
} from "../../../../../../libs/trpc/schemas/v1/devices";
import { query$or } from "@/utils/query-builder";
import { BasicService } from "@/app/basic/basic.service";

@Router({
  alias: "devicesV1",
})
@UseMiddlewares(LoggerMiddleware)
export class DevicesV1Router {
  private logger: Logger = new Logger(DevicesV1Router.name);

  constructor(
    private readonly devicesService: DevicesV1Service,
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
    input: insertOneDeviceInput,
    output: insertOneDeviceOutput,
  })
  async insertOne(
    @Input() insertOneDeviceInputData: InsertOneDeviceInput,
  ): Promise<InsertOneDeviceOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOneDeviceInputData,
        },
      });

      const device: DeviceDocument = await this.basicService.insertOne({
        schema: "Device",
        doc: insertOneDeviceInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          device,
        },
      });

      return insertOneDeviceOutput.parse(device);
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
    input: insertManyDeviceInput,
    output: insertManyDeviceOutput,
  })
  async insertMany(
    @Input() insertManyDeviceInputData: InsertManyDeviceInput,
  ): Promise<InsertManyDeviceOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManyDeviceInputData,
        },
      });

      const result: InsertManyResult<any> = await this.basicService.insertMany({
        schema: "Device",
        doc: insertManyDeviceInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManyDeviceOutput.parse(result);
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
    input: findByDeviceIdInput,
    output: findByDeviceIdOutput,
  })
  async findById(
    @Input() findByDeviceIdInputData: FindByDeviceIdInput,
  ): Promise<FindByDeviceIdOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findByDeviceIdInputData,
        },
      });

      const [device]: DeviceDocument[] = await this.basicService.find({
        schema: "Device",
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

      return findByDeviceIdOutput.parse(device);
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
    input: findByDeviceDataInput,
    output: findByDeviceDataOutput,
  })
  async findByData(
    @Input() findByDeviceDataInputData: FindByDeviceDataInput,
  ): Promise<FindByDeviceDataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findByDeviceDataInputData,
        },
      });

      const filter = query$or(findByDeviceDataInputData.filter);

      const devices: DeviceDocument[] = await this.basicService.find({
        schema: "Device",
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

      return findByDeviceDataOutput.parse(devices);
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
    input: updateByDeviceIdInput,
    output: updateByDeviceIdOutput,
  })
  async updateById(
    @Input() updateByDeviceIdInputData: UpdateByDeviceIdInput,
  ): Promise<UpdateByDeviceIdOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByDeviceIdInputData,
        },
      });

      const device = await this.basicService.findOneAndUpdate({
        schema: "Device",
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

      return updateByDeviceIdOutput.parse(device);
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
    input: updateByDeviceDataInput,
    output: updateByDeviceDataOutput,
  })
  async updateByData(
    @Input() updateByDeviceDataInputData: UpdateByDeviceDataInput,
  ): Promise<UpdateByDeviceDataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByDeviceDataInputData,
        },
      });

      const filter = query$or(updateByDeviceDataInputData.filter);

      const result = await this.basicService.updateMany({
        schema: "Device",
        filter: filter,
        update: updateByDeviceDataInputData.update,
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

      return updateByDeviceDataOutput.parse(result);
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
    input: deleteByDeviceDataInput,
    output: deleteByDeviceDataOutput,
  })
  async deleteByData(
    @Input() deleteByDeviceDataInputData: DeleteByDeviceDataInput,
  ): Promise<DeleteByDeviceDataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteByDeviceDataInputData,
        },
      });

      const filter = query$or(deleteByDeviceDataInputData.filter);

      const result: DeleteResult = await this.basicService.delete({
        schema: "Device",
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          result,
        },
      });

      return deleteByDeviceDataOutput.parse(result);
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
