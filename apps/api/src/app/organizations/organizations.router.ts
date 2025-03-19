import { Logger } from "@nestjs/common";
import { DeleteResult, InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { OrganizationDocument } from "@/app/organizations/entities/organization.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import {
  insertOneOrganizationInputSchema,
  InsertOneOrganizationInputType,
  insertOneOrganizationOutputSchema,
  InsertOneOrganizationOutputType,
  insertManyOrganizationInputSchema,
  InsertManyOrganizationInputType,
  insertManyOrganizationOutputSchema,
  InsertManyOrganizationOutputType,
  findByOrganizationDataInputSchema,
  FindByOrganizationDataInputType,
  findByOrganizationDataOutputSchema,
  FindByOrganizationDataOutputType,
  findByOrganizationIdInputSchema,
  FindByOrganizationIdInputType,
  findByOrganizationIdOutputSchema,
  FindByOrganizationIdOutputType,
  findByOrganizationRefInputSchema,
  FindByOrganizationRefInputType,
  findByOrganizationRefOutputSchema,
  FindByOrganizationRefOutputType,
  updateByOrganizationIdInputSchema,
  UpdateByOrganizationIdInputType,
  updateByOrganizationIdOutputSchema,
  UpdateByOrganizationIdOutputType,
  updateByOrganizationDataInputSchema,
  UpdateByOrganizationDataInputType,
  updateByOrganizationDataOutputSchema,
  UpdateByOrganizationDataOutputType,
  deleteByOrganizationDataInputSchema,
  DeleteByOrganizationDataInputType,
  deleteByOrganizationDataOutputSchema,
  DeleteByOrganizationDataOutputType,
  deleteByOrganizationRefInputSchema,
  DeleteByOrganizationRefInputType,
  deleteByOrganizationRefOutputSchema,
  DeleteByOrganizationRefOutputType,
} from "../../../../../libs/trpc/schemas/organizations";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";
import { BasicService } from "@/app/basic/basic.service";

@Router({
  alias: "organizations",
})
@UseMiddlewares(LoggerMiddleware)
export class OrganizationsRouter {
  private logger: Logger = new Logger(OrganizationsRouter.name);

  constructor(
    private readonly organizationsService: OrganizationsService,
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
    input: insertOneOrganizationInputSchema,
    output: insertOneOrganizationOutputSchema,
  })
  async insertOne(
    @Input() insertOneOrganizationInputData: InsertOneOrganizationInputType,
  ): Promise<InsertOneOrganizationOutputType> {
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

      return insertOneOrganizationOutputSchema.parse(organization);
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
    input: insertManyOrganizationInputSchema,
    output: insertManyOrganizationOutputSchema,
  })
  async insertMany(
    @Input() insertManyOrganizationInputData: InsertManyOrganizationInputType,
  ): Promise<InsertManyOrganizationOutputType> {
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

      return insertManyOrganizationOutputSchema.parse(result);
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
    input: findByOrganizationIdInputSchema,
    output: findByOrganizationIdOutputSchema,
  })
  async findById(
    @Input() findByOrganizationIdInputData: FindByOrganizationIdInputType,
  ): Promise<FindByOrganizationIdOutputType> {
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

      return findByOrganizationIdOutputSchema.parse(organization);
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
    input: findByOrganizationDataInputSchema,
    output: findByOrganizationDataOutputSchema,
  })
  async findByData(
    @Input() findByOrganizationDataInputData: FindByOrganizationDataInputType,
  ): Promise<FindByOrganizationDataOutputType> {
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

      return findByOrganizationDataOutputSchema.parse(organizations);
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
    input: findByOrganizationRefInputSchema,
    output: findByOrganizationRefOutputSchema,
  })
  async findByRef(
    @Input() findByOrganizationRefInputData: FindByOrganizationRefInputType,
  ): Promise<FindByOrganizationRefOutputType> {
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

      return findByOrganizationRefOutputSchema.parse(organizations);
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
    input: updateByOrganizationIdInputSchema,
    output: updateByOrganizationIdOutputSchema,
  })
  async updateById(
    @Input() updateByOrganizationIdInputData: UpdateByOrganizationIdInputType,
  ): Promise<UpdateByOrganizationIdOutputType> {
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

      return updateByOrganizationIdOutputSchema.parse(organization);
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
    input: updateByOrganizationDataInputSchema,
    output: updateByOrganizationDataOutputSchema,
  })
  async updateByData(
    @Input()
    updateByOrganizationDataInputData: UpdateByOrganizationDataInputType,
  ): Promise<UpdateByOrganizationDataOutputType> {
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

      return updateByOrganizationDataOutputSchema.parse(result);
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
    input: deleteByOrganizationDataInputSchema,
    output: deleteByOrganizationDataOutputSchema,
  })
  async deleteByData(
    @Input()
    deleteByOrganizationDataInputData: DeleteByOrganizationDataInputType,
  ): Promise<DeleteByOrganizationDataOutputType> {
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

      return deleteByOrganizationDataOutputSchema.parse(result);
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
    input: deleteByOrganizationRefInputSchema,
    output: deleteByOrganizationRefOutputSchema,
  })
  async deleteByRef(
    @Input()
    deleteByOrganizationRefInputData: DeleteByOrganizationRefInputType,
  ): Promise<DeleteByOrganizationRefOutputType> {
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

      return deleteByOrganizationRefOutputSchema.parse(result);
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
