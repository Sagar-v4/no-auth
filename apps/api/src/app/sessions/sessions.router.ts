import { Logger } from "@nestjs/common";
import { InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import {
  SessionDocument,
  STATUS,
} from "@/app/sessions/entities/session.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { SessionsService } from "@/app/sessions/sessions.service";
import {
  insertOneSessionInputSchema,
  InsertOneSessionInputType,
  insertOneSessionOutputSchema,
  InsertOneSessionOutputType,
} from "../../../../../libs/trpc/schemas/sessions/insert-one.schema";
import {
  insertManySessionInputSchema,
  InsertManySessionInputType,
  insertManySessionOutputSchema,
  InsertManySessionOutputType,
} from "../../../../../libs/trpc/schemas/sessions/insert-many.schema";
import {
  findBySessionDataInputSchema,
  FindBySessionDataInputType,
  findBySessionDataOutputSchema,
  FindBySessionDataOutputType,
} from "../../../../../libs/trpc/schemas/sessions/find-by-data.schema";
import {
  findBySessionIdInputSchema,
  FindBySessionIdInputType,
  findBySessionIdOutputSchema,
  FindBySessionIdOutputType,
} from "../../../../../libs/trpc/schemas/sessions/find-by-id.schema";
import {
  findBySessionRefInputSchema,
  FindBySessionRefInputType,
  findBySessionRefOutputSchema,
  FindBySessionRefOutputType,
} from "../../../../../libs/trpc/schemas/sessions/find-by-ref.schema";
import {
  updateBySessionIdInputSchema,
  UpdateBySessionIdInputType,
  updateBySessionIdOutputSchema,
  UpdateBySessionIdOutputType,
} from "../../../../../libs/trpc/schemas/sessions/update-by-id.schema";
import {
  updateBySessionDataInputSchema,
  UpdateBySessionDataInputType,
  updateBySessionDataOutputSchema,
  UpdateBySessionDataOutputType,
} from "../../../../../libs/trpc/schemas/sessions/update-by-data.schema";
import {
  deleteBySessionDataInputSchema,
  DeleteBySessionDataInputType,
  deleteBySessionDataOutputSchema,
  DeleteBySessionDataOutputType,
} from "../../../../../libs/trpc/schemas/sessions/delete-by-data.schema";
import {
  deleteBySessionRefInputSchema,
  DeleteBySessionRefInputType,
  deleteBySessionRefOutputSchema,
  DeleteBySessionRefOutputType,
} from "../../../../../libs/trpc/schemas/sessions/delete-by-ref.schema";
import { ClientsService } from "@/app/clients/clients.service";
import { ClientDocument } from "@/app/clients/entities/client.entity";
import { ClientelesService } from "@/app/clienteles/clienteles.service";
import { ClienteleDocument } from "@/app/clienteles/entities/clientele.entity";
import { DevicesService } from "@/app/devices/devices.service";
import { DeviceDocument } from "@/app/devices/entities/device.entity";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";

@Router({
  alias: "sessions",
})
@UseMiddlewares(LoggerMiddleware)
export class SessionsRouter {
  private logger: Logger = new Logger(SessionsRouter.name);

  constructor(
    private readonly sessionsService: SessionsService,
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

      const session: SessionDocument = await this.sessionsService.insertOne({
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

      const result: InsertManyResult<any> =
        await this.sessionsService.insertMany({
          docs: insertManySessionInputData.docs,
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

      const [session]: SessionDocument[] = await this.sessionsService.find({
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

      const sessions: SessionDocument[] = await this.sessionsService.find({
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
        await this.devicesService.getIds(
          findBySessionRefInputData.filter.device,
        ),
      );
      const client_ids = await this.clientsService.getIds(
        findBySessionRefInputData.filter.client,
      );
      const clientele_ids = await this.clientelesService.getIds(
        findBySessionRefInputData.filter.clientele,
      );
      const user_ids = concatIds(
        [findBySessionRefInputData.filter.session.user_id],
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

      if (Object.keys(findBySessionRefInputData.filter.client).length > 0) {
        const clients: ClientDocument[] = await this.clientsService.find({
          filter: findBySessionRefInputData.filter.client,
          select: ["_id"],
          populate: [],
        });
        const client_ids = clients.map((client) => client._id.toString());
        const entry = references_ids.get("user_id") || { $in: [] };
        references_ids.set("user_id", {
          $in: [...entry.$in, ...client_ids],
        });
      }

      if (Object.keys(findBySessionRefInputData.filter.clientele).length > 0) {
        const clienteles: ClienteleDocument[] =
          await this.clientelesService.find({
            filter: findBySessionRefInputData.filter.clientele,
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

      if (Object.keys(findBySessionRefInputData.filter.device).length > 0) {
        const devices: DeviceDocument[] = await this.devicesService.find({
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

      const sessions: SessionDocument[] = await this.sessionsService.find({
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

      const session = await this.sessionsService.findOneAndUpdate({
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

      const session = await this.sessionsService.updateMany({
        filter: filter,
        update: updateBySessionDataInputData.update,
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

      return updateBySessionDataOutputSchema.parse(session);
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

      const delete_count: Number = await this.sessionsService.delete({
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          delete_count,
        },
      });

      return deleteBySessionDataOutputSchema.parse({ delete_count });
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
        await this.devicesService.getIds(
          deleteBySessionRefInputData.filter.device,
        ),
      );
      const client_ids = await this.clientsService.getIds(
        deleteBySessionRefInputData.filter.client,
      );
      const clientele_ids = await this.clientelesService.getIds(
        deleteBySessionRefInputData.filter.clientele,
      );
      const user_ids = concatIds(
        [deleteBySessionRefInputData.filter.session.user_id],
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
        Object.keys(deleteBySessionRefInputData.filter.session).length === 0
      ) {
        this.logger.warn({
          action: "Exit",
          method: this.deleteByRef.name,
          metadata: {
            references_ids,
            session: Object.keys(deleteBySessionRefInputData.filter.session),
          },
        });
        return { delete_count: 0 };
      }

      const delete_count: Number = await this.sessionsService.delete({
        filter: {
          ...deleteBySessionRefInputData.filter.session,
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

      return deleteBySessionRefOutputSchema.parse({ delete_count });
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
