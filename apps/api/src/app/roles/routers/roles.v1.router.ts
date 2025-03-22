import { Logger } from "@nestjs/common";
import { DeleteResult, InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { RoleDocument } from "@/app/roles/entities/role.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { RolesV1Service } from "@/app/roles/services/roles.v1.service";
import {
  insertOneRoleInput,
  InsertOneRoleInput,
  insertOneRoleOutput,
  InsertOneRoleOutput,
  insertManyRoleInput,
  InsertManyRoleInput,
  insertManyRoleOutput,
  InsertManyRoleOutput,
  findByRoleDataInput,
  FindByRoleDataInput,
  findByRoleDataOutput,
  FindByRoleDataOutput,
  findByRoleIdInput,
  FindByRoleIdInput,
  findByRoleIdOutput,
  FindByRoleIdOutput,
  findByRoleRefInput,
  FindByRoleRefInput,
  findByRoleRefOutput,
  FindByRoleRefOutput,
  updateByRoleIdInput,
  UpdateByRoleIdInput,
  updateByRoleIdOutput,
  UpdateByRoleIdOutput,
  updateByRoleDataInput,
  UpdateByRoleDataInput,
  updateByRoleDataOutput,
  UpdateByRoleDataOutput,
  deleteByRoleDataInput,
  DeleteByRoleDataInput,
  deleteByRoleDataOutput,
  DeleteByRoleDataOutput,
  deleteByRoleRefInput,
  DeleteByRoleRefInput,
  deleteByRoleRefOutput,
  DeleteByRoleRefOutput,
} from "../../../../../../libs/trpc/schemas/v1/roles";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";
import { BasicService } from "@/app/basic/basic.service";

@Router({
  alias: "rolesV1",
})
@UseMiddlewares(LoggerMiddleware)
export class RolesV1Router {
  private logger: Logger = new Logger(RolesV1Router.name);

  constructor(
    private readonly rolesService: RolesV1Service,
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
    input: insertOneRoleInput,
    output: insertOneRoleOutput,
  })
  async insertOne(
    @Input() insertOneRoleInputData: InsertOneRoleInput,
  ): Promise<InsertOneRoleOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOneRoleInputData,
        },
      });

      const role: RoleDocument = await this.basicService.insertOne({
        schema: "Role",
        doc: insertOneRoleInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          role,
        },
      });

      return insertOneRoleOutput.parse(role);
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
    input: insertManyRoleInput,
    output: insertManyRoleOutput,
  })
  async insertMany(
    @Input() insertManyRoleInputData: InsertManyRoleInput,
  ): Promise<InsertManyRoleOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManyRoleInputData,
        },
      });

      const result: InsertManyResult<any> = await this.basicService.insertMany({
        schema: "Role",
        doc: insertManyRoleInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManyRoleOutput.parse(result);
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
    input: findByRoleIdInput,
    output: findByRoleIdOutput,
  })
  async findById(
    @Input() findByRoleIdInputData: FindByRoleIdInput,
  ): Promise<FindByRoleIdOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findByRoleIdInputData,
        },
      });

      const [role]: RoleDocument[] = await this.basicService.find({
        schema: "Role",
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

      return findByRoleIdOutput.parse(role);
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
    input: findByRoleDataInput,
    output: findByRoleDataOutput,
  })
  async findByData(
    @Input() findByRoleDataInputData: FindByRoleDataInput,
  ): Promise<FindByRoleDataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findByRoleDataInputData,
        },
      });

      const filter = query$or(findByRoleDataInputData.filter);

      const roles: RoleDocument[] = await this.basicService.find({
        schema: "Role",
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

      return findByRoleDataOutput.parse(roles);
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
    input: findByRoleRefInput,
    output: findByRoleRefOutput,
  })
  async findByRef(
    @Input() findByRoleRefInputData: FindByRoleRefInput,
  ): Promise<FindByRoleRefOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByRef.name,
        metadata: {
          findByRoleRefInputData,
        },
      });

      const user_ids = concatIds(
        [findByRoleRefInputData.filter.role.user_id],
        await this.basicService.getIds({
          schema: "User",
          filter: findByRoleRefInputData.filter.user,
        }),
      );
      const organization_ids = concatIds(
        [findByRoleRefInputData.filter.role.organization_id],
        await this.basicService.getIds({
          schema: "Organization",
          filter: findByRoleRefInputData.filter.organization,
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

      const roles: RoleDocument[] = await this.basicService.find({
        schema: "Role",
        filter: {
          ...findByRoleRefInputData.filter.role,
          ...Object.fromEntries(references_ids),
        },
        select: [],
        populate: ["user_id", "organization_id"],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByRef.name,
        metadata: {
          roles,
        },
      });

      return findByRoleRefOutput.parse(roles);
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
    input: updateByRoleIdInput,
    output: updateByRoleIdOutput,
  })
  async updateById(
    @Input() updateByRoleIdInputData: UpdateByRoleIdInput,
  ): Promise<UpdateByRoleIdOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByRoleIdInputData,
        },
      });

      const role = await this.basicService.findOneAndUpdate({
        schema: "Role",
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

      return updateByRoleIdOutput.parse(role);
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
    input: updateByRoleDataInput,
    output: updateByRoleDataOutput,
  })
  async updateByData(
    @Input()
    updateByRoleDataInputData: UpdateByRoleDataInput,
  ): Promise<UpdateByRoleDataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByRoleDataInputData,
        },
      });

      const filter = query$or(updateByRoleDataInputData.filter);

      const result = await this.basicService.updateMany({
        schema: "Role",
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

      return updateByRoleDataOutput.parse(result);
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
    input: deleteByRoleDataInput,
    output: deleteByRoleDataOutput,
  })
  async deleteByData(
    @Input()
    deleteByRoleDataInputData: DeleteByRoleDataInput,
  ): Promise<DeleteByRoleDataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteByRoleDataInputData,
        },
      });

      const filter = query$or(deleteByRoleDataInputData.filter);

      const result: DeleteResult = await this.basicService.delete({
        schema: "Role",
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          result,
        },
      });

      return deleteByRoleDataOutput.parse(result);
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
    input: deleteByRoleRefInput,
    output: deleteByRoleRefOutput,
  })
  async deleteByRef(
    @Input()
    deleteByRoleRefInputData: DeleteByRoleRefInput,
  ): Promise<DeleteByRoleRefOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByRef.name,
        metadata: {
          deleteByRoleRefInputData,
        },
      });

      const user_ids = concatIds(
        [deleteByRoleRefInputData.filter.role.user_id],
        await this.basicService.getIds({
          schema: "User",
          filter: deleteByRoleRefInputData.filter.user,
        }),
      );
      const organization_ids = concatIds(
        [deleteByRoleRefInputData.filter.role.organization_id],
        await this.basicService.getIds({
          schema: "Organization",
          filter: deleteByRoleRefInputData.filter.organization,
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
        schema: "Role",
        filter: {
          ...deleteByRoleRefInputData.filter.role,
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

      return deleteByRoleRefOutput.parse(result);
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
