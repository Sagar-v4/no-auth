import { Logger } from "@nestjs/common";
import { DeleteResult, InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { ClientelesService } from "@/app/clienteles/clienteles.service";
import { ClienteleDocument } from "@/app/clienteles/entities/clientele.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import {
  insertOneClienteleInputSchema,
  InsertOneClienteleInputType,
  insertOneClienteleOutputSchema,
  InsertOneClienteleOutputType,
  insertManyClienteleInputSchema,
  InsertManyClienteleInputType,
  insertManyClienteleOutputSchema,
  InsertManyClienteleOutputType,
  findByClienteleIdInputSchema,
  FindByClienteleIdInputType,
  findByClienteleIdOutputSchema,
  FindByClienteleIdOutputType,
  findByClienteleDataInputSchema,
  FindByClienteleDataInputType,
  findByClienteleDataOutputSchema,
  FindByClienteleDataOutputType,
  findByClienteleRefInputSchema,
  FindByClienteleRefInputType,
  findByClienteleRefOutputSchema,
  FindByClienteleRefOutputType,
  updateByClienteleIdInputSchema,
  UpdateByClienteleIdInputType,
  updateByClienteleIdOutputSchema,
  UpdateByClienteleIdOutputType,
  updateByClienteleDataInputSchema,
  UpdateByClienteleDataInputType,
  updateByClienteleDataOutputSchema,
  UpdateByClienteleDataOutputType,
  deleteByClienteleDataInputSchema,
  DeleteByClienteleDataInputType,
  deleteByClienteleDataOutputSchema,
  DeleteByClienteleDataOutputType,
  deleteByClienteleRefInputSchema,
  DeleteByClienteleRefInputType,
  deleteByClienteleRefOutputSchema,
  DeleteByClienteleRefOutputType,
} from "../../../../../libs/trpc/schemas/clienteles";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";
import { BasicService } from "@/app/basic/basic.service";

@Router({
  alias: "clienteles",
})
@UseMiddlewares(LoggerMiddleware)
export class ClientelesRouter {
  private logger: Logger = new Logger(ClientelesRouter.name);

  constructor(
    private readonly clientelesService: ClientelesService,
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
    input: insertOneClienteleInputSchema,
    output: insertOneClienteleOutputSchema,
  })
  async insertOne(
    @Input() insertOneClienteleInputData: InsertOneClienteleInputType,
  ): Promise<InsertOneClienteleOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOneClienteleInputData,
        },
      });

      const clientele: ClienteleDocument = await this.basicService.insertOne({
        schema: "Clientele",
        doc: insertOneClienteleInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          clientele,
        },
      });

      return insertOneClienteleOutputSchema.parse(clientele);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        insertOneClienteleInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: insertManyClienteleInputSchema,
    output: insertManyClienteleOutputSchema,
  })
  async insertMany(
    @Input() insertManyClienteleInputData: InsertManyClienteleInputType,
  ): Promise<InsertManyClienteleOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManyClienteleInputData,
        },
      });

      const result: InsertManyResult<any> = await this.basicService.insertMany({
        schema: "Clientele",
        doc: insertManyClienteleInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManyClienteleOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertMany.name,
        error: error,
        insertManyClienteleInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByClienteleIdInputSchema,
    output: findByClienteleIdOutputSchema,
  })
  async findById(
    @Input() findByClienteleIdInputData: FindByClienteleIdInputType,
  ): Promise<FindByClienteleIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findByClienteleIdInputData,
        },
      });

      const [clientele]: ClienteleDocument[] = await this.basicService.find({
        schema: "Clientele",
        filter: findByClienteleIdInputData.filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findById.name,
        metadata: {
          clientele,
        },
      });

      return findByClienteleIdOutputSchema.parse(clientele);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findById.name,
        error: error,
        findByClienteleIdInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByClienteleDataInputSchema,
    output: findByClienteleDataOutputSchema,
  })
  async findByData(
    @Input() findByClienteleDataInputData: FindByClienteleDataInputType,
  ): Promise<FindByClienteleDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findByClienteleDataInputData,
        },
      });

      const filter = query$or(findByClienteleDataInputData.filter);

      const clienteles: ClienteleDocument[] = await this.basicService.find({
        schema: "Clientele",
        filter: filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByData.name,
        metadata: {
          clienteles,
        },
      });

      return findByClienteleDataOutputSchema.parse(clienteles);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByData.name,
        error: error,
        findByClienteleDataInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByClienteleRefInputSchema,
    output: findByClienteleRefOutputSchema,
  })
  async findByRef(
    @Input() findByClienteleRefInputData: FindByClienteleRefInputType,
  ): Promise<FindByClienteleRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByRef.name,
        metadata: {
          findByClienteleRefInputData,
        },
      });

      const organization_ids = concatIds(
        [findByClienteleRefInputData.filter.clientele.organization_id],
        await this.basicService.getIds({
          schema: "Organization",
          filter: findByClienteleRefInputData.filter.organization,
        }),
      );

      const references_ids = new Map<string, { $in: string[] }>();
      if (organization_ids.length > 0) {
        references_ids.set("organization_id", {
          $in: organization_ids,
        });
      }

      if (
        references_ids.size === 0 &&
        Object.keys(findByClienteleRefInputData.filter.clientele).length === 0
      ) {
        this.logger.warn({
          action: "Exit",
          method: this.findByRef.name,
          metadata: {
            references_ids,
            clientele: Object.keys(
              findByClienteleRefInputData.filter.clientele,
            ),
          },
        });
        return [];
      }

      const clienteles: ClienteleDocument[] = await this.basicService.find({
        schema: "Clientele",
        filter: {
          ...findByClienteleRefInputData.filter.clientele,
          ...Object.fromEntries(references_ids),
        },
        select: [],
        populate: ["organization_id"],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByRef.name,
        metadata: {
          clienteles,
        },
      });

      return findByClienteleRefOutputSchema.parse(clienteles);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByRef.name,
        error: error,
        findByClienteleRefInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByClienteleIdInputSchema,
    output: updateByClienteleIdOutputSchema,
  })
  async updateById(
    @Input() updateByClienteleIdInputData: UpdateByClienteleIdInputType,
  ): Promise<UpdateByClienteleIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByClienteleIdInputData,
        },
      });

      const clientele = await this.basicService.findOneAndUpdate({
        schema: "Clientele",
        filter: updateByClienteleIdInputData.filter,
        update: updateByClienteleIdInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          clientele,
        },
      });

      return updateByClienteleIdOutputSchema.parse(clientele);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByClienteleIdInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByClienteleDataInputSchema,
    output: updateByClienteleDataOutputSchema,
  })
  async updateByData(
    @Input() updateByClienteleDataInputData: UpdateByClienteleDataInputType,
  ): Promise<UpdateByClienteleDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByClienteleDataInputData,
        },
      });

      const filter = query$or(updateByClienteleDataInputData.filter);

      const result = await this.basicService.updateMany({
        schema: "Clientele",
        filter: filter,
        update: updateByClienteleDataInputData.update,
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

      return updateByClienteleDataOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByClienteleDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByClienteleDataInputSchema,
    output: deleteByClienteleDataOutputSchema,
  })
  async deleteByData(
    @Input() deleteByClienteleDataInputData: DeleteByClienteleDataInputType,
  ): Promise<DeleteByClienteleDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteByClienteleDataInputData,
        },
      });

      const filter = query$or(deleteByClienteleDataInputData.filter);

      const result: DeleteResult = await this.basicService.delete({
        schema: "Clientele",
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          result,
        },
      });

      return deleteByClienteleDataOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByData.name,
        error: error,
        deleteByClienteleDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByClienteleRefInputSchema,
    output: deleteByClienteleRefOutputSchema,
  })
  async deleteByRef(
    @Input()
    deleteByClienteleRefInputData: DeleteByClienteleRefInputType,
  ): Promise<DeleteByClienteleRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByRef.name,
        metadata: {
          deleteByClienteleRefInputData,
        },
      });

      const organization_ids = concatIds(
        [deleteByClienteleRefInputData.filter.clientele.organization_id],
        await this.basicService.getIds({
          schema: "Organization",
          filter: deleteByClienteleRefInputData.filter.organization,
        }),
      );

      const references_ids = new Map<string, { $in: string[] }>();
      if (organization_ids.length > 0) {
        references_ids.set("organization_id", {
          $in: organization_ids,
        });
      }

      const result: DeleteResult = await this.basicService.delete({
        schema: "Clientele",
        filter: {
          ...deleteByClienteleRefInputData.filter.clientele,
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

      return deleteByClienteleRefOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByRef.name,
        error: error,
        deleteByClienteleRefInputData,
      });

      throw error;
    }
  }
}
