import { Logger } from "@nestjs/common";
import { InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { PermissionGroupDocument } from "@/app/permission-groups/entities/permission-group.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { PermissionGroupsService } from "@/app/permission-groups/permission-groups.service";
import {
  insertOnePermissionGroupInputSchema,
  InsertOnePermissionGroupInputType,
  insertOnePermissionGroupOutputSchema,
  InsertOnePermissionGroupOutputType,
  insertManyPermissionGroupInputSchema,
  InsertManyPermissionGroupInputType,
  insertManyPermissionGroupOutputSchema,
  InsertManyPermissionGroupOutputType,
  findByPermissionGroupDataInputSchema,
  FindByPermissionGroupDataInputType,
  findByPermissionGroupDataOutputSchema,
  FindByPermissionGroupDataOutputType,
  findByPermissionGroupIdInputSchema,
  FindByPermissionGroupIdInputType,
  findByPermissionGroupIdOutputSchema,
  FindByPermissionGroupIdOutputType,
  findByPermissionGroupRefInputSchema,
  FindByPermissionGroupRefInputType,
  findByPermissionGroupRefOutputSchema,
  FindByPermissionGroupRefOutputType,
  updateByPermissionGroupIdInputSchema,
  UpdateByPermissionGroupIdInputType,
  updateByPermissionGroupIdOutputSchema,
  UpdateByPermissionGroupIdOutputType,
  updateByPermissionGroupDataInputSchema,
  UpdateByPermissionGroupDataInputType,
  updateByPermissionGroupDataOutputSchema,
  UpdateByPermissionGroupDataOutputType,
  deleteByPermissionGroupDataInputSchema,
  DeleteByPermissionGroupDataInputType,
  deleteByPermissionGroupDataOutputSchema,
  DeleteByPermissionGroupDataOutputType,
  deleteByPermissionGroupRefInputSchema,
  DeleteByPermissionGroupRefInputType,
  deleteByPermissionGroupRefOutputSchema,
  DeleteByPermissionGroupRefOutputType,
} from "../../../../../libs/trpc/schemas/permission-groups";
import { ClientsService } from "@/app/clients/clients.service";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";

@Router({
  alias: "permissionGroups",
})
@UseMiddlewares(LoggerMiddleware)
export class PermissionGroupsRouter {
  private logger: Logger = new Logger(PermissionGroupsRouter.name);

  constructor(
    private readonly permissionGroupsService: PermissionGroupsService,
    private readonly clientsService: ClientsService,
    private readonly organizationsService: OrganizationsService,
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
    input: insertOnePermissionGroupInputSchema,
    output: insertOnePermissionGroupOutputSchema,
  })
  async insertOne(
    @Input()
    insertOnePermissionGroupInputData: InsertOnePermissionGroupInputType,
  ): Promise<InsertOnePermissionGroupOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOnePermissionGroupInputData,
        },
      });

      const permissionGroup: PermissionGroupDocument =
        await this.permissionGroupsService.insertOne({
          doc: insertOnePermissionGroupInputData.doc,
        });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          permissionGroup,
        },
      });

      return insertOnePermissionGroupOutputSchema.parse(permissionGroup);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        insertOnePermissionGroupInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: insertManyPermissionGroupInputSchema,
    output: insertManyPermissionGroupOutputSchema,
  })
  async insertMany(
    @Input()
    insertManyPermissionGroupInputData: InsertManyPermissionGroupInputType,
  ): Promise<InsertManyPermissionGroupOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManyPermissionGroupInputData,
        },
      });

      const result: InsertManyResult<any> =
        await this.permissionGroupsService.insertMany({
          docs: insertManyPermissionGroupInputData.docs,
        });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManyPermissionGroupOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertMany.name,
        error: error,
        insertManyPermissionGroupInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByPermissionGroupIdInputSchema,
    output: findByPermissionGroupIdOutputSchema,
  })
  async findById(
    @Input() findByPermissionGroupIdInputData: FindByPermissionGroupIdInputType,
  ): Promise<FindByPermissionGroupIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findByPermissionGroupIdInputData,
        },
      });

      const [permissionGroup]: PermissionGroupDocument[] =
        await this.permissionGroupsService.find({
          filter: findByPermissionGroupIdInputData.filter,
          select: [],
          populate: [],
        });

      this.logger.log({
        action: "Exit",
        method: this.findById.name,
        metadata: {
          permissionGroup,
        },
      });

      return findByPermissionGroupIdOutputSchema.parse(permissionGroup);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findById.name,
        error: error,
        findByPermissionGroupIdInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByPermissionGroupDataInputSchema,
    output: findByPermissionGroupDataOutputSchema,
  })
  async findByData(
    @Input()
    findByPermissionGroupDataInputData: FindByPermissionGroupDataInputType,
  ): Promise<FindByPermissionGroupDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findByPermissionGroupDataInputData,
        },
      });

      const filter = query$or(findByPermissionGroupDataInputData.filter);

      const permissionGroups: PermissionGroupDocument[] =
        await this.permissionGroupsService.find({
          filter: filter,
          select: [],
          populate: [],
        });

      this.logger.log({
        action: "Exit",
        method: this.findByData.name,
        metadata: {
          permissionGroups,
        },
      });

      return findByPermissionGroupDataOutputSchema.parse(permissionGroups);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByData.name,
        error: error,
        findByPermissionGroupDataInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByPermissionGroupRefInputSchema,
    output: findByPermissionGroupRefOutputSchema,
  })
  async findByRef(
    @Input()
    findByPermissionGroupRefInputData: FindByPermissionGroupRefInputType,
  ): Promise<FindByPermissionGroupRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByRef.name,
        metadata: {
          findByPermissionGroupRefInputData,
        },
      });

      const client_ids = concatIds(
        [findByPermissionGroupRefInputData.filter.permissionGroup.client_id],
        await this.clientsService.getIds(
          findByPermissionGroupRefInputData.filter.client,
        ),
      );
      const organization_ids = concatIds(
        [
          findByPermissionGroupRefInputData.filter.permissionGroup
            .organization_id,
        ],
        await this.organizationsService.getIds(
          findByPermissionGroupRefInputData.filter.organization,
        ),
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
        Object.keys(findByPermissionGroupRefInputData.filter.permissionGroup)
          .length === 0
      ) {
        this.logger.warn({
          action: "Exit",
          method: this.findByRef.name,
          metadata: {
            references_ids,
            permissionGroup: Object.keys(
              findByPermissionGroupRefInputData.filter.permissionGroup,
            ),
          },
        });
        return [];
      }

      const permissionGroups: PermissionGroupDocument[] =
        await this.permissionGroupsService.find({
          filter: {
            ...findByPermissionGroupRefInputData.filter.permissionGroup,
            ...Object.fromEntries(references_ids),
          },
          select: [],
          populate: ["client_id", "organization_id"],
        });

      this.logger.log({
        action: "Exit",
        method: this.findByRef.name,
        metadata: {
          permissionGroups,
        },
      });

      return findByPermissionGroupRefOutputSchema.parse(permissionGroups);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByRef.name,
        error: error,
        findByPermissionGroupRefInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByPermissionGroupIdInputSchema,
    output: updateByPermissionGroupIdOutputSchema,
  })
  async updateById(
    @Input()
    updateByPermissionGroupIdInputData: UpdateByPermissionGroupIdInputType,
  ): Promise<UpdateByPermissionGroupIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByPermissionGroupIdInputData,
        },
      });

      const permissionGroup =
        await this.permissionGroupsService.findOneAndUpdate({
          filter: updateByPermissionGroupIdInputData.filter,
          update: updateByPermissionGroupIdInputData.update,
          select: [],
          populate: [],
        });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          permissionGroup,
        },
      });

      return updateByPermissionGroupIdOutputSchema.parse(permissionGroup);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByPermissionGroupIdInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByPermissionGroupDataInputSchema,
    output: updateByPermissionGroupDataOutputSchema,
  })
  async updateByData(
    @Input()
    updateByPermissionGroupDataInputData: UpdateByPermissionGroupDataInputType,
  ): Promise<UpdateByPermissionGroupDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByPermissionGroupDataInputData,
        },
      });

      const filter = query$or(updateByPermissionGroupDataInputData.filter);

      const result = await this.permissionGroupsService.updateMany({
        filter: filter,
        update: updateByPermissionGroupDataInputData.update,
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

      return updateByPermissionGroupDataOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByPermissionGroupDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByPermissionGroupDataInputSchema,
    output: deleteByPermissionGroupDataOutputSchema,
  })
  async deleteByData(
    @Input()
    deleteByPermissionGroupDataInputData: DeleteByPermissionGroupDataInputType,
  ): Promise<DeleteByPermissionGroupDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteByPermissionGroupDataInputData,
        },
      });

      const filter = query$or(deleteByPermissionGroupDataInputData.filter);

      const delete_count: Number = await this.permissionGroupsService.delete({
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          delete_count,
        },
      });

      return deleteByPermissionGroupDataOutputSchema.parse({ delete_count });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByData.name,
        error: error,
        deleteByPermissionGroupDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByPermissionGroupRefInputSchema,
    output: deleteByPermissionGroupRefOutputSchema,
  })
  async deleteByRef(
    @Input()
    deleteByPermissionGroupRefInputData: DeleteByPermissionGroupRefInputType,
  ): Promise<DeleteByPermissionGroupRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByRef.name,
        metadata: {
          deleteByPermissionGroupRefInputData,
        },
      });

      const client_ids = concatIds(
        [deleteByPermissionGroupRefInputData.filter.permissionGroup.client_id],
        await this.clientsService.getIds(
          deleteByPermissionGroupRefInputData.filter.client,
        ),
      );
      const organization_ids = concatIds(
        [
          deleteByPermissionGroupRefInputData.filter.permissionGroup
            .organization_id,
        ],
        await this.organizationsService.getIds(
          deleteByPermissionGroupRefInputData.filter.organization,
        ),
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
        Object.keys(deleteByPermissionGroupRefInputData.filter.permissionGroup)
          .length === 0
      ) {
        this.logger.warn({
          action: "Exit",
          method: this.deleteByRef.name,
          metadata: {
            references_ids,
            permissionGroup: Object.keys(
              deleteByPermissionGroupRefInputData.filter.permissionGroup,
            ),
          },
        });
        return { delete_count: 0 };
      }

      const delete_count: Number = await this.permissionGroupsService.delete({
        filter: {
          ...deleteByPermissionGroupRefInputData.filter.permissionGroup,
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

      return deleteByPermissionGroupRefOutputSchema.parse({ delete_count });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByRef.name,
        error: error,
        deleteByPermissionGroupRefInputData,
      });

      throw error;
    }
  }
}
