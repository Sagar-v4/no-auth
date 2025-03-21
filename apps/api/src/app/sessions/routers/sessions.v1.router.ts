import { Logger } from "@nestjs/common";
import { DeleteResult, InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { SessionDocument } from "@/app/sessions/entities/session.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { SessionsV1Service } from "@/app/sessions/services/sessions.v1.service";
import {
  insertOneSessionInput,
  InsertOneSessionInput,
  insertOneSessionOutput,
  InsertOneSessionOutput,
  insertManySessionInput,
  InsertManySessionInput,
  insertManySessionOutput,
  InsertManySessionOutput,
  findBySessionDataInput,
  FindBySessionDataInput,
  findBySessionDataOutput,
  FindBySessionDataOutput,
  findBySessionIdInput,
  FindBySessionIdInput,
  findBySessionIdOutput,
  FindBySessionIdOutput,
  findBySessionRefInput,
  FindBySessionRefInput,
  findBySessionRefOutput,
  FindBySessionRefOutput,
  updateBySessionIdInput,
  UpdateBySessionIdInput,
  updateBySessionIdOutput,
  UpdateBySessionIdOutput,
  updateBySessionDataInput,
  UpdateBySessionDataInput,
  updateBySessionDataOutput,
  UpdateBySessionDataOutput,
  deleteBySessionDataInput,
  DeleteBySessionDataInput,
  deleteBySessionDataOutput,
  DeleteBySessionDataOutput,
  deleteBySessionRefInput,
  DeleteBySessionRefInput,
  deleteBySessionRefOutput,
  DeleteBySessionRefOutput,
} from "../../../../../../libs/trpc/schemas/v1/sessions";
import { UserDocument } from "@/app/users/entities/user.entity";
import { DeviceDocument } from "@/app/devices/entities/device.entity";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";
import { BasicService } from "@/app/basic/basic.service";

@Router({
  alias: "sessionsV1",
})
@UseMiddlewares(LoggerMiddleware)
export class SessionsV1Router {
  private logger: Logger = new Logger(SessionsV1Router.name);

  constructor(
    private readonly sessionsService: SessionsV1Service,
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
    input: insertOneSessionInput,
    output: insertOneSessionOutput,
  })
  async insertOne(
    @Input() insertOneSessionInputData: InsertOneSessionInput,
  ): Promise<InsertOneSessionOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOneSessionInputData,
        },
      });

      const session: SessionDocument = await this.basicService.insertOne({
        schema: "Session",
        doc: insertOneSessionInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          session,
        },
      });

      return insertOneSessionOutput.parse(session);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        insertOneSessionInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: insertManySessionInput,
    output: insertManySessionOutput,
  })
  async insertMany(
    @Input() insertManySessionInputData: InsertManySessionInput,
  ): Promise<InsertManySessionOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManySessionInputData,
        },
      });

      const result: InsertManyResult<any> = await this.basicService.insertMany({
        schema: "Session",
        doc: insertManySessionInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManySessionOutput.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertMany.name,
        error: error,
        insertManySessionInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findBySessionIdInput,
    output: findBySessionIdOutput,
  })
  async findById(
    @Input() findBySessionIdInputData: FindBySessionIdInput,
  ): Promise<FindBySessionIdOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findBySessionIdInputData,
        },
      });

      const [session]: SessionDocument[] = await this.basicService.find({
        schema: "Session",
        filter: findBySessionIdInputData.filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findById.name,
        metadata: {
          session,
        },
      });

      return findBySessionIdOutput.parse(session);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findById.name,
        error: error,
        findBySessionIdInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findBySessionDataInput,
    output: findBySessionDataOutput,
  })
  async findByData(
    @Input() findBySessionDataInputData: FindBySessionDataInput,
  ): Promise<FindBySessionDataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findBySessionDataInputData,
        },
      });

      const filter = query$or(findBySessionDataInputData.filter);

      const sessions: SessionDocument[] = await this.basicService.find({
        schema: "Session",
        filter: filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByData.name,
        metadata: {
          sessions,
        },
      });

      return findBySessionDataOutput.parse(sessions);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByData.name,
        error: error,
        findBySessionDataInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findBySessionRefInput,
    output: findBySessionRefOutput,
  })
  async findByRef(
    @Input() findBySessionRefInputData: FindBySessionRefInput,
  ): Promise<FindBySessionRefOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByRef.name,
        metadata: {
          findBySessionRefInputData,
        },
      });

      const device_ids = concatIds(
        [findBySessionRefInputData.filter.session.device_id],
        await this.basicService.getIds({
          schema: "Device",
          filter: findBySessionRefInputData.filter.device,
        }),
      );
      const user_ids = concatIds(
        [findBySessionRefInputData.filter.session.user_id],
        await this.basicService.getIds({
          schema: "User",
          filter: findBySessionRefInputData.filter.user,
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
        Object.keys(findBySessionRefInputData.filter.session).length === 0
      ) {
        this.logger.warn({
          action: "Exit",
          method: this.findByRef.name,
          metadata: {
            references_ids,
            session: Object.keys(findBySessionRefInputData.filter.session),
          },
        });
        return [];
      }

      if (Object.keys(findBySessionRefInputData.filter.user).length > 0) {
        const users: UserDocument[] = await this.basicService.find({
          schema: "User",
          filter: findBySessionRefInputData.filter.user,
          select: ["_id"],
          populate: [],
        });

        references_ids.set("user_id", {
          $in: users.map((user) => user._id.toString()),
        });
      }

      if (Object.keys(findBySessionRefInputData.filter.device).length > 0) {
        const devices: DeviceDocument[] = await this.basicService.find({
          schema: "Device",
          filter: findBySessionRefInputData.filter.device,
          select: ["_id"],
          populate: [],
        });

        references_ids.set("device_id", {
          $in: devices.map((device) => device._id.toString()),
        });
      }

      if (findBySessionRefInputData.filter.session.user_id) {
        const entry = references_ids.get("user_id") || { $in: [] };
        entry.$in.push(findBySessionRefInputData.filter.session.user_id);
        references_ids.set("user_id", entry);
      }

      if (findBySessionRefInputData.filter.session.device_id) {
        const entry = references_ids.get("device_id") || { $in: [] };
        entry.$in.push(findBySessionRefInputData.filter.session.device_id);
        references_ids.set("device_id", entry);
      }

      const sessions: SessionDocument[] = await this.basicService.find({
        schema: "Session",
        filter: {
          ...findBySessionRefInputData.filter.session,
          ...Object.fromEntries(references_ids),
        },
        select: [],
        populate: ["user_id", "device_id"],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByRef.name,
        metadata: {
          sessions,
        },
      });

      return findBySessionRefOutput.parse(sessions);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByRef.name,
        error: error,
        findBySessionRefInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateBySessionIdInput,
    output: updateBySessionIdOutput,
  })
  async updateById(
    @Input() updateBySessionIdInputData: UpdateBySessionIdInput,
  ): Promise<UpdateBySessionIdOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateBySessionIdInputData,
        },
      });

      const session = await this.basicService.findOneAndUpdate({
        schema: "Session",
        filter: updateBySessionIdInputData.filter,
        update: updateBySessionIdInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          session,
        },
      });

      return updateBySessionIdOutput.parse(session);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateBySessionIdInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateBySessionDataInput,
    output: updateBySessionDataOutput,
  })
  async updateByData(
    @Input()
    updateBySessionDataInputData: UpdateBySessionDataInput,
  ): Promise<UpdateBySessionDataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateBySessionDataInputData,
        },
      });

      const filter = query$or(updateBySessionDataInputData.filter);

      const result = await this.basicService.updateMany({
        schema: "Session",
        filter: filter,
        update: updateBySessionDataInputData.update,
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

      return updateBySessionDataOutput.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateBySessionDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteBySessionDataInput,
    output: deleteBySessionDataOutput,
  })
  async deleteByData(
    @Input()
    deleteBySessionDataInputData: DeleteBySessionDataInput,
  ): Promise<DeleteBySessionDataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteBySessionDataInputData,
        },
      });

      const filter = query$or(deleteBySessionDataInputData.filter);

      const result: DeleteResult = await this.basicService.delete({
        schema: "Session",
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          result,
        },
      });

      return deleteBySessionDataOutput.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByData.name,
        error: error,
        deleteBySessionDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteBySessionRefInput,
    output: deleteBySessionRefOutput,
  })
  async deleteByRef(
    @Input()
    deleteBySessionRefInputData: DeleteBySessionRefInput,
  ): Promise<DeleteBySessionRefOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByRef.name,
        metadata: {
          deleteBySessionRefInputData,
        },
      });

      const device_ids = concatIds(
        [deleteBySessionRefInputData.filter.session.device_id],
        await this.basicService.getIds({
          schema: "Device",
          filter: deleteBySessionRefInputData.filter.device,
        }),
      );
      const user_ids = concatIds(
        [deleteBySessionRefInputData.filter.session.user_id],
        await this.basicService.getIds({
          schema: "User",
          filter: deleteBySessionRefInputData.filter.user,
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
        schema: "Session",
        filter: {
          ...deleteBySessionRefInputData.filter.session,
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

      return deleteBySessionRefOutput.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByRef.name,
        error: error,
        deleteBySessionRefInputData,
      });

      throw error;
    }
  }
}
