import { Logger } from "@nestjs/common";
import { DeleteResult, InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { KeyDocument } from "@/app/keys/entities/key.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { KeysService } from "@/app/keys/keys.service";
import {
  insertOneKeyInputSchema,
  InsertOneKeyInputType,
  insertOneKeyOutputSchema,
  InsertOneKeyOutputType,
  insertManyKeyInputSchema,
  InsertManyKeyInputType,
  insertManyKeyOutputSchema,
  InsertManyKeyOutputType,
  findByKeyDataInputSchema,
  FindByKeyDataInputType,
  findByKeyDataOutputSchema,
  FindByKeyDataOutputType,
  findByKeyIdInputSchema,
  FindByKeyIdInputType,
  findByKeyIdOutputSchema,
  FindByKeyIdOutputType,
  findByKeyRefInputSchema,
  FindByKeyRefInputType,
  findByKeyRefOutputSchema,
  FindByKeyRefOutputType,
  updateByKeyIdInputSchema,
  UpdateByKeyIdInputType,
  updateByKeyIdOutputSchema,
  UpdateByKeyIdOutputType,
  updateByKeyDataInputSchema,
  UpdateByKeyDataInputType,
  updateByKeyDataOutputSchema,
  UpdateByKeyDataOutputType,
  deleteByKeyDataInputSchema,
  DeleteByKeyDataInputType,
  deleteByKeyDataOutputSchema,
  DeleteByKeyDataOutputType,
  deleteByKeyRefInputSchema,
  DeleteByKeyRefInputType,
  deleteByKeyRefOutputSchema,
  DeleteByKeyRefOutputType,
} from "../../../../../libs/trpc/schemas/keys";
import { ClientsService } from "@/app/clients/clients.service";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";
import { BasicService } from "@/app/basic/basic.service";

@Router({
  alias: "keys",
})
@UseMiddlewares(LoggerMiddleware)
export class KeysRouter {
  private logger: Logger = new Logger(KeysRouter.name);

  constructor(
    private readonly keysService: KeysService,
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
    input: insertOneKeyInputSchema,
    output: insertOneKeyOutputSchema,
  })
  async insertOne(
    @Input() insertOneKeyInputData: InsertOneKeyInputType,
  ): Promise<InsertOneKeyOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOneKeyInputData,
        },
      });

      const key: KeyDocument = await this.basicService.insertOne({
        schema: "Key",
        doc: insertOneKeyInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          key,
        },
      });

      return insertOneKeyOutputSchema.parse(key);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        insertOneKeyInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: insertManyKeyInputSchema,
    output: insertManyKeyOutputSchema,
  })
  async insertMany(
    @Input() insertManyKeyInputData: InsertManyKeyInputType,
  ): Promise<InsertManyKeyOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManyKeyInputData,
        },
      });

      const result: InsertManyResult<any> = await this.basicService.insertMany({
        schema: "Key",
        doc: insertManyKeyInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManyKeyOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertMany.name,
        error: error,
        insertManyKeyInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByKeyIdInputSchema,
    output: findByKeyIdOutputSchema,
  })
  async findById(
    @Input() findByKeyIdInputData: FindByKeyIdInputType,
  ): Promise<FindByKeyIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findByKeyIdInputData,
        },
      });

      const [key]: KeyDocument[] = await this.basicService.find({
        schema: "Key",
        filter: findByKeyIdInputData.filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findById.name,
        metadata: {
          key,
        },
      });

      return findByKeyIdOutputSchema.parse(key);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findById.name,
        error: error,
        findByKeyIdInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByKeyDataInputSchema,
    output: findByKeyDataOutputSchema,
  })
  async findByData(
    @Input() findByKeyDataInputData: FindByKeyDataInputType,
  ): Promise<FindByKeyDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findByKeyDataInputData,
        },
      });

      const filter = query$or(findByKeyDataInputData.filter);

      const keys: KeyDocument[] = await this.basicService.find({
        schema: "Key",
        filter: filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByData.name,
        metadata: {
          keys,
        },
      });

      return findByKeyDataOutputSchema.parse(keys);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByData.name,
        error: error,
        findByKeyDataInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByKeyRefInputSchema,
    output: findByKeyRefOutputSchema,
  })
  async findByRef(
    @Input() findByKeyRefInputData: FindByKeyRefInputType,
  ): Promise<FindByKeyRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByRef.name,
        metadata: {
          findByKeyRefInputData,
        },
      });

      const client_ids = concatIds(
        [findByKeyRefInputData.filter.key.client_id],
        await this.basicService.getIds({
          schema: "Client",
          filter: findByKeyRefInputData.filter.client,
        }),
      );
      const organization_ids = concatIds(
        [findByKeyRefInputData.filter.key.organization_id],
        await this.basicService.getIds({
          schema: "Organization",
          filter: findByKeyRefInputData.filter.organization,
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
        Object.keys(findByKeyRefInputData.filter.key).length === 0
      ) {
        this.logger.warn({
          action: "Exit",
          method: this.findByRef.name,
          metadata: {
            references_ids,
            key: Object.keys(findByKeyRefInputData.filter.key),
          },
        });
        return [];
      }

      const keys: KeyDocument[] = await this.basicService.find({
        schema: "Key",
        filter: {
          ...findByKeyRefInputData.filter.key,
          ...Object.fromEntries(references_ids),
        },
        select: [],
        populate: ["client_id", "organization_id"],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByRef.name,
        metadata: {
          keys,
        },
      });

      return findByKeyRefOutputSchema.parse(keys);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByRef.name,
        error: error,
        findByKeyRefInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByKeyIdInputSchema,
    output: updateByKeyIdOutputSchema,
  })
  async updateById(
    @Input() updateByKeyIdInputData: UpdateByKeyIdInputType,
  ): Promise<UpdateByKeyIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByKeyIdInputData,
        },
      });

      const key = await this.basicService.findOneAndUpdate({
        schema: "Key",
        filter: updateByKeyIdInputData.filter,
        update: updateByKeyIdInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          key,
        },
      });

      return updateByKeyIdOutputSchema.parse(key);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByKeyIdInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByKeyDataInputSchema,
    output: updateByKeyDataOutputSchema,
  })
  async updateByData(
    @Input()
    updateByKeyDataInputData: UpdateByKeyDataInputType,
  ): Promise<UpdateByKeyDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByKeyDataInputData,
        },
      });

      const filter = query$or(updateByKeyDataInputData.filter);

      const result = await this.basicService.updateMany({
        schema: "Key",
        filter: filter,
        update: updateByKeyDataInputData.update,
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

      return updateByKeyDataOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByKeyDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByKeyDataInputSchema,
    output: deleteByKeyDataOutputSchema,
  })
  async deleteByData(
    @Input()
    deleteByKeyDataInputData: DeleteByKeyDataInputType,
  ): Promise<DeleteByKeyDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteByKeyDataInputData,
        },
      });

      const filter = query$or(deleteByKeyDataInputData.filter);

      const result: DeleteResult = await this.basicService.delete({
        schema: "Key",
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          result,
        },
      });

      return deleteByKeyDataOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByData.name,
        error: error,
        deleteByKeyDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByKeyRefInputSchema,
    output: deleteByKeyRefOutputSchema,
  })
  async deleteByRef(
    @Input()
    deleteByKeyRefInputData: DeleteByKeyRefInputType,
  ): Promise<DeleteByKeyRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByRef.name,
        metadata: {
          deleteByKeyRefInputData,
        },
      });

      const client_ids = concatIds(
        [deleteByKeyRefInputData.filter.key.client_id],
        await this.basicService.getIds({
          schema: "Client",
          filter: deleteByKeyRefInputData.filter.client,
        }),
      );
      const organization_ids = concatIds(
        [deleteByKeyRefInputData.filter.key.organization_id],
        await this.basicService.getIds({
          schema: "Organization",
          filter: deleteByKeyRefInputData.filter.organization,
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
        schema: "Key",
        filter: {
          ...deleteByKeyRefInputData.filter.key,
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

      return deleteByKeyRefOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByRef.name,
        error: error,
        deleteByKeyRefInputData,
      });

      throw error;
    }
  }
}
