import { Logger } from "@nestjs/common";
import { InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { ClientelesService } from "@/app/clienteles/clienteles.service";
import {
  ClienteleDocument,
  STATUS,
} from "@/app/clienteles/entities/clientele.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import {
  insertOneClienteleInputSchema,
  InsertOneClienteleInputType,
  insertOneClienteleOutputSchema,
  InsertOneClienteleOutputType,
} from "./schemas/insert-one.schema";
import {
  insertManyClienteleInputSchema,
  InsertManyClienteleInputType,
  insertManyClienteleOutputSchema,
  InsertManyClienteleOutputType,
} from "./schemas/insert-many.schema";
import {
  findByClienteleIdInputSchema,
  FindByClienteleIdInputType,
  findByClienteleIdOutputSchema,
  FindByClienteleIdOutputType,
} from "./schemas/find-by-id.schema";
import {
  findByClienteleDataInputSchema,
  FindByClienteleDataInputType,
  findByClienteleDataOutputSchema,
  FindByClienteleDataOutputType,
} from "./schemas/find-by-data.schema";
import {
  findByClienteleRefInputSchema,
  FindByClienteleRefInputType,
  findByClienteleRefOutputSchema,
  FindByClienteleRefOutputType,
} from "./schemas/find-by-ref.schema";
import {
  updateByClienteleIdInputSchema,
  UpdateByClienteleIdInputType,
  updateByClienteleIdOutputSchema,
  UpdateByClienteleIdOutputType,
} from "./schemas/update-by-id.schema";
import {
  updateByClienteleDataInputSchema,
  UpdateByClienteleDataInputType,
  updateByClienteleDataOutputSchema,
  UpdateByClienteleDataOutputType,
} from "./schemas/update-by-data.schema";
import {
  deleteByClienteleDataInputSchema,
  DeleteByClienteleDataInputType,
  deleteByClienteleDataOutputSchema,
  DeleteByClienteleDataOutputType,
} from "./schemas/delete-by-data.schema";
import {
  deleteByClienteleRefInputSchema,
  DeleteByClienteleRefInputType,
  deleteByClienteleRefOutputSchema,
  DeleteByClienteleRefOutputType,
} from "./schemas/delete-by-ref.schema";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import { OrganizationDocument } from "@/app/organizations/entities/organization.entity";

@Router({
  alias: "clienteles",
})
@UseMiddlewares(LoggerMiddleware)
export class ClientelesRouter {
  private logger: Logger = new Logger(ClientelesRouter.name);

  constructor(
    private readonly clientelesService: ClientelesService,
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
    input: insertOneClienteleInputSchema,
    output: insertOneClienteleOutputSchema,
  })
  async insertOne(
    @Input() insertOneClienteleInputData: InsertOneClienteleInputType,
  ): Promise<InsertOneClienteleOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOneClienteleInputData,
        },
      });

      const clientele: ClienteleDocument =
        await this.clientelesService.insertOne({
          doc: insertOneClienteleInputData.doc,
        });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          clientele,
        },
      });

      return insertOneClienteleOutputSchema.parse(clientele);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        insertOneClienteleInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: insertManyClienteleInputSchema,
    output: insertManyClienteleOutputSchema,
  })
  async insertMany(
    @Input() insertManyClienteleInputData: InsertManyClienteleInputType,
  ): Promise<InsertManyClienteleOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManyClienteleInputData,
        },
      });

      const result: InsertManyResult<any> =
        await this.clientelesService.insertMany({
          docs: insertManyClienteleInputData.docs,
        });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManyClienteleOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertMany.name,
        error: error,
        insertManyClienteleInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByClienteleIdInputSchema,
    output: findByClienteleIdOutputSchema,
  })
  async findById(
    @Input() findByClienteleIdInputData: FindByClienteleIdInputType,
  ): Promise<FindByClienteleIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findByClienteleIdInputData,
        },
      });

      const [clientele]: ClienteleDocument[] =
        await this.clientelesService.find({
          filter: findByClienteleIdInputData.filter,
          select: [],
          populate: [],
        });

      this.logger.log({
        action: "Exit",
        method: this.findById.name,
        metadata: {
          clientele,
        },
      });

      return findByClienteleIdOutputSchema.parse(clientele);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findById.name,
        error: error,
        findByClienteleIdInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByClienteleDataInputSchema,
    output: findByClienteleDataOutputSchema,
  })
  async findByData(
    @Input() findByClienteleDataInputData: FindByClienteleDataInputType,
  ): Promise<FindByClienteleDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findByClienteleDataInputData,
        },
      });

      const filter = findByClienteleDataInputData.filter.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => {
          if (!acc[key]) {
            acc[key] = { $in: [] };
          }
          acc[key]["$in"].push(obj[key]);
        });
        return acc;
      }, {});

      const clienteles: ClienteleDocument[] = await this.clientelesService.find(
        {
          filter: filter,
          select: [],
          populate: [],
        },
      );

      this.logger.log({
        action: "Exit",
        method: this.findByData.name,
        metadata: {
          clienteles,
        },
      });

      return findByClienteleDataOutputSchema.parse(clienteles);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByData.name,
        error: error,
        findByClienteleDataInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByClienteleRefInputSchema,
    output: findByClienteleRefOutputSchema,
  })
  async findByRef(
    @Input() findByClienteleRefInputData: FindByClienteleRefInputType,
  ): Promise<FindByClienteleRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByRef.name,
        metadata: {
          findByClienteleRefInputData,
        },
      });

      const organizations: OrganizationDocument[] =
        await this.organizationsService.find({
          filter: findByClienteleRefInputData.filter.organization,
          select: [],
          populate: [],
        });

      const organization_ids = organizations.map((organization) =>
        organization._id.toString(),
      );
      if (findByClienteleRefInputData.filter.clientele.organization_id) {
        organization_ids.push(
          findByClienteleRefInputData.filter.clientele.organization_id,
        );
      }

      const clienteles: ClienteleDocument[] = await this.clientelesService.find(
        {
          filter: {
            ...findByClienteleRefInputData.filter.clientele,
            organization_id: { $in: organization_ids },
          },
          select: [],
          populate: ["organization_id"],
        },
      );

      this.logger.log({
        action: "Exit",
        method: this.findByRef.name,
        metadata: {
          clienteles,
        },
      });

      return findByClienteleRefOutputSchema.parse(clienteles);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByRef.name,
        error: error,
        findByClienteleRefInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByClienteleIdInputSchema,
    output: updateByClienteleIdOutputSchema,
  })
  async updateById(
    @Input() updateByClienteleIdInputData: UpdateByClienteleIdInputType,
  ): Promise<UpdateByClienteleIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByClienteleIdInputData,
        },
      });

      const clientele = await this.clientelesService.findOneAndUpdate({
        filter: updateByClienteleIdInputData.filter,
        update: updateByClienteleIdInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          clientele,
        },
      });

      return updateByClienteleIdOutputSchema.parse(clientele);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByClienteleIdInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByClienteleDataInputSchema,
    output: updateByClienteleDataOutputSchema,
  })
  async updateByData(
    @Input() updateByClienteleDataInputData: UpdateByClienteleDataInputType,
  ): Promise<UpdateByClienteleDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByClienteleDataInputData,
        },
      });

      const filter = updateByClienteleDataInputData.filter.reduce(
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

      const clientele = await this.clientelesService.updateMany({
        filter: filter,
        update: updateByClienteleDataInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          clientele,
        },
      });

      return updateByClienteleDataOutputSchema.parse(clientele);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByClienteleDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByClienteleDataInputSchema,
    output: deleteByClienteleDataOutputSchema,
  })
  async deleteByData(
    @Input() deleteByClienteleDataInputData: DeleteByClienteleDataInputType,
  ): Promise<DeleteByClienteleDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteByClienteleDataInputData,
        },
      });

      const filter = deleteByClienteleDataInputData.filter.reduce(
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

      const delete_count: Number = await this.clientelesService.delete({
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          delete_count,
        },
      });

      return deleteByClienteleDataOutputSchema.parse({ delete_count });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByData.name,
        error: error,
        deleteByClienteleDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByClienteleRefInputSchema,
    output: deleteByClienteleRefOutputSchema,
  })
  async deleteByRef(
    @Input()
    deleteByClienteleRefInputData: DeleteByClienteleRefInputType,
  ): Promise<DeleteByClienteleRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByRef.name,
        metadata: {
          deleteByClienteleRefInputData,
        },
      });

      const organizations: OrganizationDocument[] =
        await this.organizationsService.find({
          filter: deleteByClienteleRefInputData.filter.organization,
          select: [],
          populate: [],
        });

      const organization_ids = organizations.map((organization) =>
        organization._id.toString(),
      );
      if (deleteByClienteleRefInputData.filter.clientele.organization_id) {
        organization_ids.push(
          deleteByClienteleRefInputData.filter.clientele.organization_id,
        );
      }

      const delete_count: Number = await this.clientelesService.delete({
        filter: {
          ...deleteByClienteleRefInputData.filter.clientele,
          organization_id: { $in: organization_ids },
        },
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByRef.name,
        metadata: {
          delete_count,
        },
      });

      return deleteByClienteleRefOutputSchema.parse({ delete_count });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByRef.name,
        error: error,
        deleteByClienteleRefInputData,
      });

      throw error;
    }
  }
}
