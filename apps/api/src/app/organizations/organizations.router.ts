import { Logger } from "@nestjs/common";
import { InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import {
  OrganizationDocument,
  STATUS,
} from "@/app/organizations/entities/organization.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import {
  insertOneOrganizationInputSchema,
  InsertOneOrganizationInputType,
  insertOneOrganizationOutputSchema,
  InsertOneOrganizationOutputType,
} from "./schemas/insert-one.schema";
import {
  insertManyOrganizationInputSchema,
  InsertManyOrganizationInputType,
  insertManyOrganizationOutputSchema,
  InsertManyOrganizationOutputType,
} from "./schemas/insert-many.schema";
import {
  findByOrganizationDataInputSchema,
  FindByOrganizationDataInputType,
  findByOrganizationDataOutputSchema,
  FindByOrganizationDataOutputType,
} from "./schemas/find-by-data.schema";
import {
  findByOrganizationIdInputSchema,
  FindByOrganizationIdInputType,
  findByOrganizationIdOutputSchema,
  FindByOrganizationIdOutputType,
} from "./schemas/find-by-id.schema";
import {
  findByOrganizationRefInputSchema,
  FindByOrganizationRefInputType,
  findByOrganizationRefOutputSchema,
  FindByOrganizationRefOutputType,
} from "./schemas/find-by-ref.schema";
import {
  updateByOrganizationIdInputSchema,
  UpdateByOrganizationIdInputType,
  updateByOrganizationIdOutputSchema,
  UpdateByOrganizationIdOutputType,
} from "./schemas/update-by-id.schema";
import {
  updateByOrganizationDataInputSchema,
  UpdateByOrganizationDataInputType,
  updateByOrganizationDataOutputSchema,
  UpdateByOrganizationDataOutputType,
} from "./schemas/update-by-data.schema";
import {
  deleteByOrganizationDataInputSchema,
  DeleteByOrganizationDataInputType,
  deleteByOrganizationDataOutputSchema,
  DeleteByOrganizationDataOutputType,
} from "./schemas/delete-by-data.schema";
import {
  deleteByOrganizationRefInputSchema,
  DeleteByOrganizationRefInputType,
  deleteByOrganizationRefOutputSchema,
  DeleteByOrganizationRefOutputType,
} from "./schemas/delete-by-ref.schema";
import { ClientsService } from "@/app/clients/clients.service";
import { ClientDocument } from "@/app/clients/entities/client.entity";

@Router({
  alias: "organizations",
})
@UseMiddlewares(LoggerMiddleware)
export class OrganizationsRouter {
  private logger: Logger = new Logger(OrganizationsRouter.name);

  constructor(
    private readonly organizationsService: OrganizationsService,
    private readonly clientsService: ClientsService,
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
        await this.organizationsService.insertOne({
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

      const result: InsertManyResult<any> =
        await this.organizationsService.insertMany({
          docs: insertManyOrganizationInputData.docs,
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
        await this.organizationsService.find({
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

      const filter = findByOrganizationDataInputData.filter.reduce(
        (acc, obj) => {
          Object.keys(obj).forEach((key) => {
            if (!acc[key]) {
              acc[key] = { $in: [] };
            }
            acc[key]["$in"].push(obj[key]);
          });
          return acc;
        },
        {},
      );

      const organizations: OrganizationDocument[] =
        await this.organizationsService.find({
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

      const clients: ClientDocument[] = await this.clientsService.find({
        filter: findByOrganizationRefInputData.filter.client,
        select: [],
        populate: [],
      });

      const client_ids = clients.map((client) => client._id.toString());
      if (findByOrganizationRefInputData.filter.organization.client_id) {
        client_ids.push(
          findByOrganizationRefInputData.filter.organization.client_id,
        );
      }

      const organizations: OrganizationDocument[] =
        await this.organizationsService.find({
          filter: {
            ...findByOrganizationRefInputData.filter.organization,
            client_id: { $in: client_ids },
          },
          select: [],
          populate: ["client_id"],
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

      const organization = await this.organizationsService.findOneAndUpdate({
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

      const filter = updateByOrganizationDataInputData.filter.reduce(
        (acc, obj) => {
          Object.keys(obj).forEach((key) => {
            if (!acc[key]) {
              acc[key] = { $in: [] };
            }
            acc[key]["$in"].push(obj[key]);
          });
          return acc;
        },
        {},
      );

      const organization = await this.organizationsService.updateMany({
        filter: filter,
        update: updateByOrganizationDataInputData.update,
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

      return updateByOrganizationDataOutputSchema.parse(organization);
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

      const filter = deleteByOrganizationDataInputData.filter.reduce(
        (acc, obj) => {
          Object.keys(obj).forEach((key) => {
            if (!acc[key]) {
              acc[key] = { $in: [] };
            }
            acc[key]["$in"].push(obj[key]);
          });
          return acc;
        },
        {},
      );

      const delete_count: Number = await this.organizationsService.delete({
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          delete_count,
        },
      });

      return deleteByOrganizationDataOutputSchema.parse({ delete_count });
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

      const clients: ClientDocument[] = await this.clientsService.find({
        filter: deleteByOrganizationRefInputData.filter.client,
        select: [],
        populate: [],
      });

      const client_ids = clients.map((client) => client._id.toString());
      if (deleteByOrganizationRefInputData.filter.organization.client_id) {
        client_ids.push(
          deleteByOrganizationRefInputData.filter.organization.client_id,
        );
      }

      const delete_count: Number = await this.organizationsService.delete({
        filter: {
          ...deleteByOrganizationRefInputData.filter.organization,
          client_id: { $in: client_ids },
        },
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByRef.name,
        metadata: {
          delete_count,
        },
      });

      return deleteByOrganizationRefOutputSchema.parse({ delete_count });
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
