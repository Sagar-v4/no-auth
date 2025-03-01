import { Logger } from "@nestjs/common";
import { InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { ClientsService } from "@/app/clients/clients.service";
import { ClientDocument, STATUS } from "@/app/clients/entities/client.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import {
  insertOneClientInputSchema,
  InsertOneClientInputType,
  insertOneClientOutputSchema,
  InsertOneClientOutputType,
} from "./schemas/insert-one.schema";
import {
  insertManyClientInputSchema,
  InsertManyClientInputType,
  insertManyClientOutputSchema,
  InsertManyClientOutputType,
} from "./schemas/insert-many.schema";
import {
  findByClientIdInputSchema,
  FindByClientIdInputType,
  findByClientIdOutputSchema,
  FindByClientIdOutputType,
} from "./schemas/find-by-id.schema";
import {
  findByClientDataInputSchema,
  FindByClientDataInputType,
  findByClientDataOutputSchema,
  FindByClientDataOutputType,
} from "./schemas/find-by-data.schema";
import {
  updateByClientIdInputSchema,
  UpdateByClientIdInputType,
  updateByClientIdOutputSchema,
  UpdateByClientIdOutputType,
} from "./schemas/update-by-id.schema";
import {
  updateByClientDataInputSchema,
  UpdateByClientDataInputType,
  updateByClientDataOutputSchema,
  UpdateByClientDataOutputType,
} from "./schemas/update-by-data.schema";
import {
  deleteByClientDataInputSchema,
  DeleteByClientDataInputType,
  deleteByClientDataOutputSchema,
  DeleteByClientDataOutputType,
} from "./schemas/delete-by-data.schema";

@Router({
  alias: "clients",
})
@UseMiddlewares(LoggerMiddleware)
export class ClientsRouter {
  private logger: Logger = new Logger(ClientsRouter.name);

  constructor(private readonly clientsService: ClientsService) {
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
    input: insertOneClientInputSchema,
    output: insertOneClientOutputSchema,
  })
  async insertOne(
    @Input() insertOneClientInputData: InsertOneClientInputType,
  ): Promise<InsertOneClientOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOneClientInputData,
        },
      });

      const client: ClientDocument = await this.clientsService.insertOne({
        doc: insertOneClientInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          client,
        },
      });

      return insertOneClientOutputSchema.parse(client);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        insertOneClientInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: insertManyClientInputSchema,
    output: insertManyClientOutputSchema,
  })
  async insertMany(
    @Input() insertManyClientInputData: InsertManyClientInputType,
  ): Promise<InsertManyClientOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManyClientInputData,
        },
      });

      const result: InsertManyResult<any> =
        await this.clientsService.insertMany({
          docs: insertManyClientInputData.docs,
        });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManyClientOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertMany.name,
        error: error,
        insertManyClientInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByClientIdInputSchema,
    output: findByClientIdOutputSchema,
  })
  async findById(
    @Input() findByClientIdInputData: FindByClientIdInputType,
  ): Promise<FindByClientIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findByClientIdInputData,
        },
      });

      const [client]: ClientDocument[] = await this.clientsService.find({
        filter: findByClientIdInputData.filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findById.name,
        metadata: {
          client,
        },
      });

      return findByClientIdOutputSchema.parse(client);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findById.name,
        error: error,
        findByClientIdInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByClientDataInputSchema,
    output: findByClientDataOutputSchema,
  })
  async findByData(
    @Input() findByClientDataInputData: FindByClientDataInputType,
  ): Promise<FindByClientDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findByClientDataInputData,
        },
      });

      const filter = findByClientDataInputData.filter.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => {
          if (!acc[key]) {
            acc[key] = { $in: [] };
          }
          acc[key]["$in"].push(obj[key]);
        });
        return acc;
      }, {});

      const clients: ClientDocument[] = await this.clientsService.find({
        filter: filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByData.name,
        metadata: {
          clients,
        },
      });

      return findByClientDataOutputSchema.parse(clients);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByData.name,
        error: error,
        findByClientDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByClientIdInputSchema,
    output: updateByClientIdOutputSchema,
  })
  async updateById(
    @Input() updateByClientIdInputData: UpdateByClientIdInputType,
  ): Promise<UpdateByClientIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByClientIdInputData,
        },
      });

      const client = await this.clientsService.findOneAndUpdate({
        filter: updateByClientIdInputData.filter,
        update: updateByClientIdInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          client,
        },
      });

      return updateByClientIdOutputSchema.parse(client);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByClientIdInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByClientDataInputSchema,
    output: updateByClientDataOutputSchema,
  })
  async updateByData(
    @Input() updateByClientDataInputData: UpdateByClientDataInputType,
  ): Promise<UpdateByClientDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByClientDataInputData,
        },
      });

      const filter = updateByClientDataInputData.filter.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => {
          if (!acc[key]) {
            acc[key] = { $in: [] };
          }
          acc[key]["$in"].push(obj[key]);
        });
        return acc;
      }, {});

      const client = await this.clientsService.updateMany({
        filter: filter,
        update: updateByClientDataInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          client,
        },
      });

      return updateByClientDataOutputSchema.parse(client);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByClientDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByClientDataInputSchema,
    output: deleteByClientDataOutputSchema,
  })
  async deleteByData(
    @Input() deleteByClientDataInputData: DeleteByClientDataInputType,
  ): Promise<DeleteByClientDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteByClientDataInputData,
        },
      });

      const filter = deleteByClientDataInputData.filter.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => {
          if (!acc[key]) {
            acc[key] = { $in: [] };
          }
          acc[key]["$in"].push(obj[key]);
        });
        return acc;
      }, {});

      const delete_count: Number = await this.clientsService.delete({
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          delete_count,
        },
      });

      return deleteByClientDataOutputSchema.parse({ delete_count });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByData.name,
        error: error,
        deleteByClientDataInputData,
      });

      throw error;
    }
  }
}
