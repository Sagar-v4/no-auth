import { Logger } from "@nestjs/common";
import { DeleteResult, InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { PermissionDocument } from "@/app/permissions/entities/permission.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { PermissionsV1Service } from "@/app/permissions/services/permissions.v1.service";
import {
  insertOnePermissionInput,
  InsertOnePermissionInput,
  insertOnePermissionOutput,
  InsertOnePermissionOutput,
  insertManyPermissionInput,
  InsertManyPermissionInput,
  insertManyPermissionOutput,
  InsertManyPermissionOutput,
  findByPermissionDataInput,
  FindByPermissionDataInput,
  findByPermissionDataOutput,
  FindByPermissionDataOutput,
  findByPermissionIdInput,
  FindByPermissionIdInput,
  findByPermissionIdOutput,
  FindByPermissionIdOutput,
  findByPermissionRefInput,
  FindByPermissionRefInput,
  findByPermissionRefOutput,
  FindByPermissionRefOutput,
  updateByPermissionIdInput,
  UpdateByPermissionIdInput,
  updateByPermissionIdOutput,
  UpdateByPermissionIdOutput,
  updateByPermissionDataInput,
  UpdateByPermissionDataInput,
  updateByPermissionDataOutput,
  UpdateByPermissionDataOutput,
  deleteByPermissionDataInput,
  DeleteByPermissionDataInput,
  deleteByPermissionDataOutput,
  DeleteByPermissionDataOutput,
  deleteByPermissionRefInput,
  DeleteByPermissionRefInput,
  deleteByPermissionRefOutput,
  DeleteByPermissionRefOutput,
} from "../../../../../../libs/trpc/schemas/v1/permissions";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";
import { BasicService } from "@/app/basic/basic.service";

@Router({
  alias: "permissionsV1",
})
@UseMiddlewares(LoggerMiddleware)
export class PermissionsV1Router {
  private logger: Logger = new Logger(PermissionsV1Router.name);

  constructor(
    private readonly permissionsService: PermissionsV1Service,
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
    input: insertOnePermissionInput,
    output: insertOnePermissionOutput,
  })
  async insertOne(
    @Input() insertOnePermissionInputData: InsertOnePermissionInput,
  ): Promise<InsertOnePermissionOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOnePermissionInputData,
        },
      });

      const permission: PermissionDocument = await this.basicService.insertOne({
        schema: "Permission",
        doc: insertOnePermissionInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          permission,
        },
      });

      return insertOnePermissionOutput.parse(permission);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        insertOnePermissionInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: insertManyPermissionInput,
    output: insertManyPermissionOutput,
  })
  async insertMany(
    @Input() insertManyPermissionInputData: InsertManyPermissionInput,
  ): Promise<InsertManyPermissionOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManyPermissionInputData,
        },
      });

      const result: InsertManyResult<any> = await this.basicService.insertMany({
        schema: "Permission",
        doc: insertManyPermissionInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManyPermissionOutput.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertMany.name,
        error: error,
        insertManyPermissionInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByPermissionIdInput,
    output: findByPermissionIdOutput,
  })
  async findById(
    @Input() findByPermissionIdInputData: FindByPermissionIdInput,
  ): Promise<FindByPermissionIdOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findByPermissionIdInputData,
        },
      });

      const [permission]: PermissionDocument[] = await this.basicService.find({
        schema: "Permission",
        filter: findByPermissionIdInputData.filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findById.name,
        metadata: {
          permission,
        },
      });

      return findByPermissionIdOutput.parse(permission);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findById.name,
        error: error,
        findByPermissionIdInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByPermissionDataInput,
    output: findByPermissionDataOutput,
  })
  async findByData(
    @Input() findByPermissionDataInputData: FindByPermissionDataInput,
  ): Promise<FindByPermissionDataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findByPermissionDataInputData,
        },
      });

      const filter = query$or(findByPermissionDataInputData.filter);

      const permissions: PermissionDocument[] = await this.basicService.find({
        schema: "Permission",
        filter: filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByData.name,
        metadata: {
          permissions,
        },
      });

      return findByPermissionDataOutput.parse(permissions);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByData.name,
        error: error,
        findByPermissionDataInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByPermissionRefInput,
    output: findByPermissionRefOutput,
  })
  async findByRef(
    @Input() findByPermissionRefInputData: FindByPermissionRefInput,
  ): Promise<FindByPermissionRefOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByRef.name,
        metadata: {
          findByPermissionRefInputData,
        },
      });

      const user_ids = concatIds(
        [findByPermissionRefInputData.filter.permission.user_id],
        await this.basicService.getIds({
          schema: "User",
          filter: findByPermissionRefInputData.filter.user,
        }),
      );
      const organization_ids = concatIds(
        [findByPermissionRefInputData.filter.permission.organization_id],
        await this.basicService.getIds({
          schema: "Organization",
          filter: findByPermissionRefInputData.filter.organization,
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
        Object.keys(findByPermissionRefInputData.filter.permission).length === 0
      ) {
        this.logger.warn({
          action: "Exit",
          method: this.findByRef.name,
          metadata: {
            references_ids,
            permission: Object.keys(
              findByPermissionRefInputData.filter.permission,
            ),
          },
        });
        return [];
      }

      const permissions: PermissionDocument[] = await this.basicService.find({
        schema: "Permission",
        filter: {
          ...findByPermissionRefInputData.filter.permission,
          ...Object.fromEntries(references_ids),
        },
        select: [],
        populate: ["user_id", "organization_id"],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByRef.name,
        metadata: {
          permissions,
        },
      });

      return findByPermissionRefOutput.parse(permissions);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByRef.name,
        error: error,
        findByPermissionRefInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByPermissionIdInput,
    output: updateByPermissionIdOutput,
  })
  async updateById(
    @Input() updateByPermissionIdInputData: UpdateByPermissionIdInput,
  ): Promise<UpdateByPermissionIdOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByPermissionIdInputData,
        },
      });

      const permission = await this.basicService.findOneAndUpdate({
        schema: "Permission",
        filter: updateByPermissionIdInputData.filter,
        update: updateByPermissionIdInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          permission,
        },
      });

      return updateByPermissionIdOutput.parse(permission);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByPermissionIdInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByPermissionDataInput,
    output: updateByPermissionDataOutput,
  })
  async updateByData(
    @Input()
    updateByPermissionDataInputData: UpdateByPermissionDataInput,
  ): Promise<UpdateByPermissionDataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByPermissionDataInputData,
        },
      });

      const filter = query$or(updateByPermissionDataInputData.filter);

      const result = await this.basicService.updateMany({
        schema: "Permission",
        filter: filter,
        update: updateByPermissionDataInputData.update,
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

      return updateByPermissionDataOutput.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByPermissionDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByPermissionDataInput,
    output: deleteByPermissionDataOutput,
  })
  async deleteByData(
    @Input()
    deleteByPermissionDataInputData: DeleteByPermissionDataInput,
  ): Promise<DeleteByPermissionDataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteByPermissionDataInputData,
        },
      });

      const filter = query$or(deleteByPermissionDataInputData.filter);

      const result: DeleteResult = await this.basicService.delete({
        schema: "Permission",
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          result,
        },
      });

      return deleteByPermissionDataOutput.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByData.name,
        error: error,
        deleteByPermissionDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByPermissionRefInput,
    output: deleteByPermissionRefOutput,
  })
  async deleteByRef(
    @Input()
    deleteByPermissionRefInputData: DeleteByPermissionRefInput,
  ): Promise<DeleteByPermissionRefOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByRef.name,
        metadata: {
          deleteByPermissionRefInputData,
        },
      });

      const user_ids = concatIds(
        [deleteByPermissionRefInputData.filter.permission.user_id],
        await this.basicService.getIds({
          schema: "User",
          filter: deleteByPermissionRefInputData.filter.user,
        }),
      );
      const organization_ids = concatIds(
        [deleteByPermissionRefInputData.filter.permission.organization_id],
        await this.basicService.getIds({
          schema: "Organization",
          filter: deleteByPermissionRefInputData.filter.organization,
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
        schema: "Permission",
        filter: {
          ...deleteByPermissionRefInputData.filter.permission,
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

      return deleteByPermissionRefOutput.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByRef.name,
        error: error,
        deleteByPermissionRefInputData,
      });

      throw error;
    }
  }
}
