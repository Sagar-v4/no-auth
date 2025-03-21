import { Logger } from "@nestjs/common";
import { DeleteResult, InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { OrganizationDocument } from "@/app/organizations/entities/organization.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { OrganizationsV1Service } from "@/app/organizations/services/organizations.v1.service";
import {
  insertOneOrganizationInput,
  InsertOneOrganizationInput,
  insertOneOrganizationOutput,
  InsertOneOrganizationOutput,
  insertManyOrganizationInput,
  InsertManyOrganizationInput,
  insertManyOrganizationOutput,
  InsertManyOrganizationOutput,
  findByOrganizationDataInput,
  FindByOrganizationDataInput,
  findByOrganizationDataOutput,
  FindByOrganizationDataOutput,
  findByOrganizationIdInput,
  FindByOrganizationIdInput,
  findByOrganizationIdOutput,
  FindByOrganizationIdOutput,
  findByOrganizationRefInput,
  FindByOrganizationRefInput,
  findByOrganizationRefOutput,
  FindByOrganizationRefOutput,
  updateByOrganizationIdInput,
  UpdateByOrganizationIdInput,
  updateByOrganizationIdOutput,
  UpdateByOrganizationIdOutput,
  updateByOrganizationDataInput,
  UpdateByOrganizationDataInput,
  updateByOrganizationDataOutput,
  UpdateByOrganizationDataOutput,
  deleteByOrganizationDataInput,
  DeleteByOrganizationDataInput,
  deleteByOrganizationDataOutput,
  DeleteByOrganizationDataOutput,
  deleteByOrganizationRefInput,
  DeleteByOrganizationRefInput,
  deleteByOrganizationRefOutput,
  DeleteByOrganizationRefOutput,
} from "../../../../../../libs/trpc/schemas/v1/organizations";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";
import { BasicService } from "@/app/basic/basic.service";

@Router({
  alias: "organizationsV1",
})
@UseMiddlewares(LoggerMiddleware)
export class OrganizationsV1Router {
  private logger: Logger = new Logger(OrganizationsV1Router.name);

  constructor(
    private readonly organizationsService: OrganizationsV1Service,
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
    input: insertOneOrganizationInput,
    output: insertOneOrganizationOutput,
  })
  async insertOne(
    @Input() insertOneOrganizationInputData: InsertOneOrganizationInput,
  ): Promise<InsertOneOrganizationOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOneOrganizationInputData,
        },
      });

      const organization: OrganizationDocument =
        await this.basicService.insertOne({
          schema: "Organization",
          doc: insertOneOrganizationInputData.doc,
        });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          organization,
        },
      });

      return insertOneOrganizationOutput.parse(organization);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        insertOneOrganizationInputData,
      });

      throw error;
    }
  }
  @Mutation({
    input: insertManyOrganizationInput,
    output: insertManyOrganizationOutput,
  })
  async insertMany(
    @Input() insertManyOrganizationInputData: InsertManyOrganizationInput,
  ): Promise<InsertManyOrganizationOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManyOrganizationInputData,
        },
      });

      const result: InsertManyResult<any> = await this.basicService.insertMany({
        schema: "Organization",
        doc: insertManyOrganizationInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManyOrganizationOutput.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertMany.name,
        error: error,
        insertManyOrganizationInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByOrganizationIdInput,
    output: findByOrganizationIdOutput,
  })
  async findById(
    @Input() findByOrganizationIdInputData: FindByOrganizationIdInput,
  ): Promise<FindByOrganizationIdOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findByOrganizationIdInputData,
        },
      });

      const [organization]: OrganizationDocument[] =
        await this.basicService.find({
          schema: "Organization",
          filter: findByOrganizationIdInputData.filter,
          select: [],
          populate: [],
        });

      this.logger.log({
        action: "Exit",
        method: this.findById.name,
        metadata: {
          organization,
        },
      });

      return findByOrganizationIdOutput.parse(organization);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findById.name,
        error: error,
        findByOrganizationIdInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByOrganizationDataInput,
    output: findByOrganizationDataOutput,
  })
  async findByData(
    @Input() findByOrganizationDataInputData: FindByOrganizationDataInput,
  ): Promise<FindByOrganizationDataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findByOrganizationDataInputData,
        },
      });

      const filter = query$or(findByOrganizationDataInputData.filter);

      const organizations: OrganizationDocument[] =
        await this.basicService.find({
          schema: "Organization",
          filter: filter,
          select: [],
          populate: [],
        });

      this.logger.log({
        action: "Exit",
        method: this.findByData.name,
        metadata: {
          organizations,
        },
      });

      return findByOrganizationDataOutput.parse(organizations);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByData.name,
        error: error,
        findByOrganizationDataInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByOrganizationRefInput,
    output: findByOrganizationRefOutput,
  })
  async findByRef(
    @Input() findByOrganizationRefInputData: FindByOrganizationRefInput,
  ): Promise<FindByOrganizationRefOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByRef.name,
        metadata: {
          findByOrganizationRefInputData,
        },
      });

      const user_ids = concatIds(
        [findByOrganizationRefInputData.filter.organization.user_id],
        await this.basicService.getIds({
          schema: "User",
          filter: findByOrganizationRefInputData.filter.user,
        }),
      );

      const references_ids = new Map<string, { $in: string[] }>();
      if (user_ids.length > 0) {
        references_ids.set("user_id", {
          $in: user_ids,
        });
      }

      if (
        references_ids.size === 0 &&
        Object.keys(findByOrganizationRefInputData.filter.organization)
          .length === 0
      ) {
        this.logger.warn({
          action: "Exit",
          method: this.findByRef.name,
          metadata: {
            references_ids,
            organization: Object.keys(
              findByOrganizationRefInputData.filter.organization,
            ),
          },
        });
        return [];
      }

      const organizations: OrganizationDocument[] =
        await this.basicService.find({
          schema: "Organization",
          filter: {
            ...findByOrganizationRefInputData.filter.organization,
            ...Object.fromEntries(references_ids),
          },
          select: [],
          populate: ["user_id"],
        });

      this.logger.log({
        action: "Exit",
        method: this.findByRef.name,
        metadata: {
          organizations,
        },
      });

      return findByOrganizationRefOutput.parse(organizations);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByRef.name,
        error: error,
        findByOrganizationRefInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByOrganizationIdInput,
    output: updateByOrganizationIdOutput,
  })
  async updateById(
    @Input() updateByOrganizationIdInputData: UpdateByOrganizationIdInput,
  ): Promise<UpdateByOrganizationIdOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByOrganizationIdInputData,
        },
      });

      const organization = await this.basicService.findOneAndUpdate({
        schema: "Organization",
        filter: updateByOrganizationIdInputData.filter,
        update: updateByOrganizationIdInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          organization,
        },
      });

      return updateByOrganizationIdOutput.parse(organization);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByOrganizationIdInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByOrganizationDataInput,
    output: updateByOrganizationDataOutput,
  })
  async updateByData(
    @Input()
    updateByOrganizationDataInputData: UpdateByOrganizationDataInput,
  ): Promise<UpdateByOrganizationDataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByOrganizationDataInputData,
        },
      });

      const filter = query$or(updateByOrganizationDataInputData.filter);

      const result = await this.basicService.updateMany({
        schema: "Organization",
        filter: filter,
        update: updateByOrganizationDataInputData.update,
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

      return updateByOrganizationDataOutput.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByOrganizationDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByOrganizationDataInput,
    output: deleteByOrganizationDataOutput,
  })
  async deleteByData(
    @Input()
    deleteByOrganizationDataInputData: DeleteByOrganizationDataInput,
  ): Promise<DeleteByOrganizationDataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteByOrganizationDataInputData,
        },
      });

      const filter = query$or(deleteByOrganizationDataInputData.filter);

      const result: DeleteResult = await this.basicService.delete({
        schema: "Organization",
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          result,
        },
      });

      return deleteByOrganizationDataOutput.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByData.name,
        error: error,
        deleteByOrganizationDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByOrganizationRefInput,
    output: deleteByOrganizationRefOutput,
  })
  async deleteByRef(
    @Input()
    deleteByOrganizationRefInputData: DeleteByOrganizationRefInput,
  ): Promise<DeleteByOrganizationRefOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByRef.name,
        metadata: {
          deleteByOrganizationRefInputData,
        },
      });

      const user_ids = concatIds(
        [deleteByOrganizationRefInputData.filter.organization.user_id],
        await this.basicService.getIds({
          schema: "User",
          filter: deleteByOrganizationRefInputData.filter.user,
        }),
      );

      const references_ids = new Map<string, { $in: string[] }>();
      if (user_ids.length > 0) {
        references_ids.set("user_id", {
          $in: user_ids,
        });
      }

      const result: DeleteResult = await this.basicService.delete({
        schema: "Organization",
        filter: {
          ...deleteByOrganizationRefInputData.filter.organization,
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

      return deleteByOrganizationRefOutput.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByRef.name,
        error: error,
        deleteByOrganizationRefInputData,
      });

      throw error;
    }
  }
}
