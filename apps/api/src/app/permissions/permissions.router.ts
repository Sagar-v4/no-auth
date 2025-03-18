import { Logger } from "@nestjs/common";
import { DeleteResult, InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { PermissionDocument } from "@/app/permissions/entities/permission.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { PermissionsService } from "@/app/permissions/permissions.service";
import {
  insertOnePermissionInputSchema,
  InsertOnePermissionInputType,
  insertOnePermissionOutputSchema,
  InsertOnePermissionOutputType,
  insertManyPermissionInputSchema,
  InsertManyPermissionInputType,
  insertManyPermissionOutputSchema,
  InsertManyPermissionOutputType,
  findByPermissionDataInputSchema,
  FindByPermissionDataInputType,
  findByPermissionDataOutputSchema,
  FindByPermissionDataOutputType,
  findByPermissionIdInputSchema,
  FindByPermissionIdInputType,
  findByPermissionIdOutputSchema,
  FindByPermissionIdOutputType,
  findByPermissionRefInputSchema,
  FindByPermissionRefInputType,
  findByPermissionRefOutputSchema,
  FindByPermissionRefOutputType,
  updateByPermissionIdInputSchema,
  UpdateByPermissionIdInputType,
  updateByPermissionIdOutputSchema,
  UpdateByPermissionIdOutputType,
  updateByPermissionDataInputSchema,
  UpdateByPermissionDataInputType,
  updateByPermissionDataOutputSchema,
  UpdateByPermissionDataOutputType,
  deleteByPermissionDataInputSchema,
  DeleteByPermissionDataInputType,
  deleteByPermissionDataOutputSchema,
  DeleteByPermissionDataOutputType,
  deleteByPermissionRefInputSchema,
  DeleteByPermissionRefInputType,
  deleteByPermissionRefOutputSchema,
  DeleteByPermissionRefOutputType,
} from "../../../../../libs/trpc/schemas/permissions";
import { ClientsService } from "@/app/clients/clients.service";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";
import { BasicService } from "@/app/basic/basic.service";

@Router({
  alias: "permissions",
})
@UseMiddlewares(LoggerMiddleware)
export class PermissionsRouter {
  private logger: Logger = new Logger(PermissionsRouter.name);

  constructor(
    private readonly permissionsService: PermissionsService,
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
    input: insertOnePermissionInputSchema,
    output: insertOnePermissionOutputSchema,
  })
  async insertOne(
    @Input() insertOnePermissionInputData: InsertOnePermissionInputType,
  ): Promise<InsertOnePermissionOutputType> {
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

      return insertOnePermissionOutputSchema.parse(permission);
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
    input: insertManyPermissionInputSchema,
    output: insertManyPermissionOutputSchema,
  })
  async insertMany(
    @Input() insertManyPermissionInputData: InsertManyPermissionInputType,
  ): Promise<InsertManyPermissionOutputType> {
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

      return insertManyPermissionOutputSchema.parse(result);
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
    input: findByPermissionIdInputSchema,
    output: findByPermissionIdOutputSchema,
  })
  async findById(
    @Input() findByPermissionIdInputData: FindByPermissionIdInputType,
  ): Promise<FindByPermissionIdOutputType> {
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

      return findByPermissionIdOutputSchema.parse(permission);
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
    input: findByPermissionDataInputSchema,
    output: findByPermissionDataOutputSchema,
  })
  async findByData(
    @Input() findByPermissionDataInputData: FindByPermissionDataInputType,
  ): Promise<FindByPermissionDataOutputType> {
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

      return findByPermissionDataOutputSchema.parse(permissions);
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
    input: findByPermissionRefInputSchema,
    output: findByPermissionRefOutputSchema,
  })
  async findByRef(
    @Input() findByPermissionRefInputData: FindByPermissionRefInputType,
  ): Promise<FindByPermissionRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByRef.name,
        metadata: {
          findByPermissionRefInputData,
        },
      });

      const client_ids = concatIds(
        [findByPermissionRefInputData.filter.permission.client_id],
        await this.basicService.getIds({
          schema: "Client",
          filter: findByPermissionRefInputData.filter.client,
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
        populate: ["client_id", "organization_id"],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByRef.name,
        metadata: {
          permissions,
        },
      });

      return findByPermissionRefOutputSchema.parse(permissions);
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
    input: updateByPermissionIdInputSchema,
    output: updateByPermissionIdOutputSchema,
  })
  async updateById(
    @Input() updateByPermissionIdInputData: UpdateByPermissionIdInputType,
  ): Promise<UpdateByPermissionIdOutputType> {
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

      return updateByPermissionIdOutputSchema.parse(permission);
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
    input: updateByPermissionDataInputSchema,
    output: updateByPermissionDataOutputSchema,
  })
  async updateByData(
    @Input()
    updateByPermissionDataInputData: UpdateByPermissionDataInputType,
  ): Promise<UpdateByPermissionDataOutputType> {
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

      return updateByPermissionDataOutputSchema.parse(result);
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
    input: deleteByPermissionDataInputSchema,
    output: deleteByPermissionDataOutputSchema,
  })
  async deleteByData(
    @Input()
    deleteByPermissionDataInputData: DeleteByPermissionDataInputType,
  ): Promise<DeleteByPermissionDataOutputType> {
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

      return deleteByPermissionDataOutputSchema.parse(result);
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
    input: deleteByPermissionRefInputSchema,
    output: deleteByPermissionRefOutputSchema,
  })
  async deleteByRef(
    @Input()
    deleteByPermissionRefInputData: DeleteByPermissionRefInputType,
  ): Promise<DeleteByPermissionRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByRef.name,
        metadata: {
          deleteByPermissionRefInputData,
        },
      });

      const client_ids = concatIds(
        [deleteByPermissionRefInputData.filter.permission.client_id],
        await this.basicService.getIds({
          schema: "Client",
          filter: deleteByPermissionRefInputData.filter.client,
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

      return deleteByPermissionRefOutputSchema.parse(result);
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
