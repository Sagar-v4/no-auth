import { Logger } from "@nestjs/common";
import { DeleteResult, InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { KeyDocument } from "@/app/keys/entities/key.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { KeysV1Service } from "@/app/keys/services/keys.v1.service";
import {
  insertOneKeyInput,
  InsertOneKeyInput,
  insertOneKeyOutput,
  InsertOneKeyOutput,
  insertManyKeyInput,
  InsertManyKeyInput,
  insertManyKeyOutput,
  InsertManyKeyOutput,
  findByKeyDataInput,
  FindByKeyDataInput,
  findByKeyDataOutput,
  FindByKeyDataOutput,
  findByKeyIdInput,
  FindByKeyIdInput,
  findByKeyIdOutput,
  FindByKeyIdOutput,
  findByKeyRefInput,
  FindByKeyRefInput,
  findByKeyRefOutput,
  FindByKeyRefOutput,
  updateByKeyIdInput,
  UpdateByKeyIdInput,
  updateByKeyIdOutput,
  UpdateByKeyIdOutput,
  updateByKeyDataInput,
  UpdateByKeyDataInput,
  updateByKeyDataOutput,
  UpdateByKeyDataOutput,
  deleteByKeyDataInput,
  DeleteByKeyDataInput,
  deleteByKeyDataOutput,
  DeleteByKeyDataOutput,
  deleteByKeyRefInput,
  DeleteByKeyRefInput,
  deleteByKeyRefOutput,
  DeleteByKeyRefOutput,
} from "../../../../../../libs/trpc/schemas/v1/keys";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";
import { BasicService } from "@/app/basic/basic.service";

@Router({
  alias: "keysV1",
})
@UseMiddlewares(LoggerMiddleware)
export class KeysV1Router {
  private logger: Logger = new Logger(KeysV1Router.name);

  constructor(
    private readonly keysService: KeysV1Service,
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
    input: insertOneKeyInput,
    output: insertOneKeyOutput,
  })
  async insertOne(
    @Input() insertOneKeyInputData: InsertOneKeyInput,
  ): Promise<InsertOneKeyOutput> {
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

      return insertOneKeyOutput.parse(key);
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
    input: insertManyKeyInput,
    output: insertManyKeyOutput,
  })
  async insertMany(
    @Input() insertManyKeyInputData: InsertManyKeyInput,
  ): Promise<InsertManyKeyOutput> {
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

      return insertManyKeyOutput.parse(result);
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
    input: findByKeyIdInput,
    output: findByKeyIdOutput,
  })
  async findById(
    @Input() findByKeyIdInputData: FindByKeyIdInput,
  ): Promise<FindByKeyIdOutput> {
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

      return findByKeyIdOutput.parse(key);
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
    input: findByKeyDataInput,
    output: findByKeyDataOutput,
  })
  async findByData(
    @Input() findByKeyDataInputData: FindByKeyDataInput,
  ): Promise<FindByKeyDataOutput> {
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

      return findByKeyDataOutput.parse(keys);
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
    input: findByKeyRefInput,
    output: findByKeyRefOutput,
  })
  async findByRef(
    @Input() findByKeyRefInputData: FindByKeyRefInput,
  ): Promise<FindByKeyRefOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByRef.name,
        metadata: {
          findByKeyRefInputData,
        },
      });

      const user_ids = concatIds(
        [findByKeyRefInputData.filter.key.user_id],
        await this.basicService.getIds({
          schema: "User",
          filter: findByKeyRefInputData.filter.user,
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
      if (user_ids.length > 0) {
        references_ids.set("user_id", {
          $in: user_ids,
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
        populate: ["user_id", "organization_id"],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByRef.name,
        metadata: {
          keys,
        },
      });

      return findByKeyRefOutput.parse(keys);
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
    input: updateByKeyIdInput,
    output: updateByKeyIdOutput,
  })
  async updateById(
    @Input() updateByKeyIdInputData: UpdateByKeyIdInput,
  ): Promise<UpdateByKeyIdOutput> {
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

      return updateByKeyIdOutput.parse(key);
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
    input: updateByKeyDataInput,
    output: updateByKeyDataOutput,
  })
  async updateByData(
    @Input()
    updateByKeyDataInputData: UpdateByKeyDataInput,
  ): Promise<UpdateByKeyDataOutput> {
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

      return updateByKeyDataOutput.parse(result);
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
    input: deleteByKeyDataInput,
    output: deleteByKeyDataOutput,
  })
  async deleteByData(
    @Input()
    deleteByKeyDataInputData: DeleteByKeyDataInput,
  ): Promise<DeleteByKeyDataOutput> {
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

      return deleteByKeyDataOutput.parse(result);
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
    input: deleteByKeyRefInput,
    output: deleteByKeyRefOutput,
  })
  async deleteByRef(
    @Input()
    deleteByKeyRefInputData: DeleteByKeyRefInput,
  ): Promise<DeleteByKeyRefOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByRef.name,
        metadata: {
          deleteByKeyRefInputData,
        },
      });

      const user_ids = concatIds(
        [deleteByKeyRefInputData.filter.key.user_id],
        await this.basicService.getIds({
          schema: "User",
          filter: deleteByKeyRefInputData.filter.user,
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
      if (user_ids.length > 0) {
        references_ids.set("user_id", {
          $in: user_ids,
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

      return deleteByKeyRefOutput.parse(result);
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
