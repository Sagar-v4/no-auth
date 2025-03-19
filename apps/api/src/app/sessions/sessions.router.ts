import { Logger } from "@nestjs/common";
import { DeleteResult, InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { SessionDocument } from "@/app/sessions/entities/session.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { SessionsService } from "@/app/sessions/sessions.service";
import {
  insertOneSessionInputSchema,
  InsertOneSessionInputType,
  insertOneSessionOutputSchema,
  InsertOneSessionOutputType,
  insertManySessionInputSchema,
  InsertManySessionInputType,
  insertManySessionOutputSchema,
  InsertManySessionOutputType,
  findBySessionDataInputSchema,
  FindBySessionDataInputType,
  findBySessionDataOutputSchema,
  FindBySessionDataOutputType,
  findBySessionIdInputSchema,
  FindBySessionIdInputType,
  findBySessionIdOutputSchema,
  FindBySessionIdOutputType,
  findBySessionRefInputSchema,
  FindBySessionRefInputType,
  findBySessionRefOutputSchema,
  FindBySessionRefOutputType,
  updateBySessionIdInputSchema,
  UpdateBySessionIdInputType,
  updateBySessionIdOutputSchema,
  UpdateBySessionIdOutputType,
  updateBySessionDataInputSchema,
  UpdateBySessionDataInputType,
  updateBySessionDataOutputSchema,
  UpdateBySessionDataOutputType,
  deleteBySessionDataInputSchema,
  DeleteBySessionDataInputType,
  deleteBySessionDataOutputSchema,
  DeleteBySessionDataOutputType,
  deleteBySessionRefInputSchema,
  DeleteBySessionRefInputType,
  deleteBySessionRefOutputSchema,
  DeleteBySessionRefOutputType,
} from "../../../../../libs/trpc/schemas/sessions";
import { UserDocument } from "@/app/users/entities/user.entity";
import { DeviceDocument } from "@/app/devices/entities/device.entity";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";
import { BasicService } from "@/app/basic/basic.service";

@Router({
  alias: "sessions",
})
@UseMiddlewares(LoggerMiddleware)
export class SessionsRouter {
  private logger: Logger = new Logger(SessionsRouter.name);

  constructor(
    private readonly sessionsService: SessionsService,
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
    input: insertOneSessionInputSchema,
    output: insertOneSessionOutputSchema,
  })
  async insertOne(
    @Input() insertOneSessionInputData: InsertOneSessionInputType,
  ): Promise<InsertOneSessionOutputType> {
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

      return insertOneSessionOutputSchema.parse(session);
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
    input: insertManySessionInputSchema,
    output: insertManySessionOutputSchema,
  })
  async insertMany(
    @Input() insertManySessionInputData: InsertManySessionInputType,
  ): Promise<InsertManySessionOutputType> {
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

      return insertManySessionOutputSchema.parse(result);
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
    input: findBySessionIdInputSchema,
    output: findBySessionIdOutputSchema,
  })
  async findById(
    @Input() findBySessionIdInputData: FindBySessionIdInputType,
  ): Promise<FindBySessionIdOutputType> {
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

      return findBySessionIdOutputSchema.parse(session);
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
    input: findBySessionDataInputSchema,
    output: findBySessionDataOutputSchema,
  })
  async findByData(
    @Input() findBySessionDataInputData: FindBySessionDataInputType,
  ): Promise<FindBySessionDataOutputType> {
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

      return findBySessionDataOutputSchema.parse(sessions);
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
    input: findBySessionRefInputSchema,
    output: findBySessionRefOutputSchema,
  })
  async findByRef(
    @Input() findBySessionRefInputData: FindBySessionRefInputType,
  ): Promise<FindBySessionRefOutputType> {
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

      return findBySessionRefOutputSchema.parse(sessions);
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
    input: updateBySessionIdInputSchema,
    output: updateBySessionIdOutputSchema,
  })
  async updateById(
    @Input() updateBySessionIdInputData: UpdateBySessionIdInputType,
  ): Promise<UpdateBySessionIdOutputType> {
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

      return updateBySessionIdOutputSchema.parse(session);
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
    input: updateBySessionDataInputSchema,
    output: updateBySessionDataOutputSchema,
  })
  async updateByData(
    @Input()
    updateBySessionDataInputData: UpdateBySessionDataInputType,
  ): Promise<UpdateBySessionDataOutputType> {
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

      return updateBySessionDataOutputSchema.parse(result);
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
    input: deleteBySessionDataInputSchema,
    output: deleteBySessionDataOutputSchema,
  })
  async deleteByData(
    @Input()
    deleteBySessionDataInputData: DeleteBySessionDataInputType,
  ): Promise<DeleteBySessionDataOutputType> {
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

      return deleteBySessionDataOutputSchema.parse(result);
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
    input: deleteBySessionRefInputSchema,
    output: deleteBySessionRefOutputSchema,
  })
  async deleteByRef(
    @Input()
    deleteBySessionRefInputData: DeleteBySessionRefInputType,
  ): Promise<DeleteBySessionRefOutputType> {
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

      return deleteBySessionRefOutputSchema.parse(result);
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
