import { Logger } from "@nestjs/common";
import { InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { RoleDocument } from "@/app/roles/entities/role.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { RolesService } from "@/app/roles/roles.service";
import {
  insertOneRoleInputSchema,
  InsertOneRoleInputType,
  insertOneRoleOutputSchema,
  InsertOneRoleOutputType,
  insertManyRoleInputSchema,
  InsertManyRoleInputType,
  insertManyRoleOutputSchema,
  InsertManyRoleOutputType,
  findByRoleDataInputSchema,
  FindByRoleDataInputType,
  findByRoleDataOutputSchema,
  FindByRoleDataOutputType,
  findByRoleIdInputSchema,
  FindByRoleIdInputType,
  findByRoleIdOutputSchema,
  FindByRoleIdOutputType,
  findByRoleRefInputSchema,
  FindByRoleRefInputType,
  findByRoleRefOutputSchema,
  FindByRoleRefOutputType,
  updateByRoleIdInputSchema,
  UpdateByRoleIdInputType,
  updateByRoleIdOutputSchema,
  UpdateByRoleIdOutputType,
  updateByRoleDataInputSchema,
  UpdateByRoleDataInputType,
  updateByRoleDataOutputSchema,
  UpdateByRoleDataOutputType,
  deleteByRoleDataInputSchema,
  DeleteByRoleDataInputType,
  deleteByRoleDataOutputSchema,
  DeleteByRoleDataOutputType,
  deleteByRoleRefInputSchema,
  DeleteByRoleRefInputType,
  deleteByRoleRefOutputSchema,
  DeleteByRoleRefOutputType,
} from "../../../../../libs/trpc/schemas/roles";
import { ClientsService } from "@/app/clients/clients.service";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";

@Router({
  alias: "roles",
})
@UseMiddlewares(LoggerMiddleware)
export class RolesRouter {
  private logger: Logger = new Logger(RolesRouter.name);

  constructor(
    private readonly rolesService: RolesService,
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
    input: insertOneRoleInputSchema,
    output: insertOneRoleOutputSchema,
  })
  async insertOne(
    @Input() insertOneRoleInputData: InsertOneRoleInputType,
  ): Promise<InsertOneRoleOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOneRoleInputData,
        },
      });

      const role: RoleDocument = await this.rolesService.insertOne({
        doc: insertOneRoleInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          role,
        },
      });

      return insertOneRoleOutputSchema.parse(role);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        insertOneRoleInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: insertManyRoleInputSchema,
    output: insertManyRoleOutputSchema,
  })
  async insertMany(
    @Input() insertManyRoleInputData: InsertManyRoleInputType,
  ): Promise<InsertManyRoleOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManyRoleInputData,
        },
      });

      const result: InsertManyResult<any> = await this.rolesService.insertMany({
        docs: insertManyRoleInputData.docs,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManyRoleOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertMany.name,
        error: error,
        insertManyRoleInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByRoleIdInputSchema,
    output: findByRoleIdOutputSchema,
  })
  async findById(
    @Input() findByRoleIdInputData: FindByRoleIdInputType,
  ): Promise<FindByRoleIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findByRoleIdInputData,
        },
      });

      const [role]: RoleDocument[] = await this.rolesService.find({
        filter: findByRoleIdInputData.filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findById.name,
        metadata: {
          role,
        },
      });

      return findByRoleIdOutputSchema.parse(role);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findById.name,
        error: error,
        findByRoleIdInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByRoleDataInputSchema,
    output: findByRoleDataOutputSchema,
  })
  async findByData(
    @Input() findByRoleDataInputData: FindByRoleDataInputType,
  ): Promise<FindByRoleDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findByRoleDataInputData,
        },
      });

      const filter = query$or(findByRoleDataInputData.filter);

      const roles: RoleDocument[] = await this.rolesService.find({
        filter: filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByData.name,
        metadata: {
          roles,
        },
      });

      return findByRoleDataOutputSchema.parse(roles);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByData.name,
        error: error,
        findByRoleDataInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByRoleRefInputSchema,
    output: findByRoleRefOutputSchema,
  })
  async findByRef(
    @Input() findByRoleRefInputData: FindByRoleRefInputType,
  ): Promise<FindByRoleRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByRef.name,
        metadata: {
          findByRoleRefInputData,
        },
      });

      const client_ids = concatIds(
        [findByRoleRefInputData.filter.role.client_id],
        await this.clientsService.getIds(findByRoleRefInputData.filter.client),
      );
      const organization_ids = concatIds(
        [findByRoleRefInputData.filter.role.organization_id],
        await this.organizationsService.getIds(
          findByRoleRefInputData.filter.organization,
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
        Object.keys(findByRoleRefInputData.filter.role).length === 0
      ) {
        this.logger.warn({
          action: "Exit",
          method: this.findByRef.name,
          metadata: {
            references_ids,
            role: Object.keys(findByRoleRefInputData.filter.role),
          },
        });
        return [];
      }

      const roles: RoleDocument[] = await this.rolesService.find({
        filter: {
          ...findByRoleRefInputData.filter.role,
          ...Object.fromEntries(references_ids),
        },
        select: [],
        populate: ["client_id", "organization_id"],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByRef.name,
        metadata: {
          roles,
        },
      });

      return findByRoleRefOutputSchema.parse(roles);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByRef.name,
        error: error,
        findByRoleRefInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByRoleIdInputSchema,
    output: updateByRoleIdOutputSchema,
  })
  async updateById(
    @Input() updateByRoleIdInputData: UpdateByRoleIdInputType,
  ): Promise<UpdateByRoleIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByRoleIdInputData,
        },
      });

      const role = await this.rolesService.findOneAndUpdate({
        filter: updateByRoleIdInputData.filter,
        update: updateByRoleIdInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          role,
        },
      });

      return updateByRoleIdOutputSchema.parse(role);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByRoleIdInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByRoleDataInputSchema,
    output: updateByRoleDataOutputSchema,
  })
  async updateByData(
    @Input()
    updateByRoleDataInputData: UpdateByRoleDataInputType,
  ): Promise<UpdateByRoleDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByRoleDataInputData,
        },
      });

      const filter = query$or(updateByRoleDataInputData.filter);

      const result = await this.rolesService.updateMany({
        filter: filter,
        update: updateByRoleDataInputData.update,
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

      return updateByRoleDataOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByRoleDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByRoleDataInputSchema,
    output: deleteByRoleDataOutputSchema,
  })
  async deleteByData(
    @Input()
    deleteByRoleDataInputData: DeleteByRoleDataInputType,
  ): Promise<DeleteByRoleDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteByRoleDataInputData,
        },
      });

      const filter = query$or(deleteByRoleDataInputData.filter);

      const delete_count: Number = await this.rolesService.delete({
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          delete_count,
        },
      });

      return deleteByRoleDataOutputSchema.parse({ delete_count });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByData.name,
        error: error,
        deleteByRoleDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByRoleRefInputSchema,
    output: deleteByRoleRefOutputSchema,
  })
  async deleteByRef(
    @Input()
    deleteByRoleRefInputData: DeleteByRoleRefInputType,
  ): Promise<DeleteByRoleRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByRef.name,
        metadata: {
          deleteByRoleRefInputData,
        },
      });

      const client_ids = concatIds(
        [deleteByRoleRefInputData.filter.role.client_id],
        await this.clientsService.getIds(
          deleteByRoleRefInputData.filter.client,
        ),
      );
      const organization_ids = concatIds(
        [deleteByRoleRefInputData.filter.role.organization_id],
        await this.organizationsService.getIds(
          deleteByRoleRefInputData.filter.organization,
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
        Object.keys(deleteByRoleRefInputData.filter.role).length === 0
      ) {
        this.logger.warn({
          action: "Exit",
          method: this.deleteByRef.name,
          metadata: {
            references_ids,
            role: Object.keys(deleteByRoleRefInputData.filter.role),
          },
        });
        return { delete_count: 0 };
      }

      const delete_count: Number = await this.rolesService.delete({
        filter: {
          ...deleteByRoleRefInputData.filter.role,
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

      return deleteByRoleRefOutputSchema.parse({ delete_count });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByRef.name,
        error: error,
        deleteByRoleRefInputData,
      });

      throw error;
    }
  }
}
