import { Logger } from "@nestjs/common";
import { InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { KeyDocument, STATUS } from "@/app/keys/entities/key.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { KeysService } from "@/app/keys/keys.service";
import {
  insertOneKeyInputSchema,
  InsertOneKeyInputType,
  insertOneKeyOutputSchema,
  InsertOneKeyOutputType,
} from "./schemas/insert-one.schema";
import {
  insertManyKeyInputSchema,
  InsertManyKeyInputType,
  insertManyKeyOutputSchema,
  InsertManyKeyOutputType,
} from "./schemas/insert-many.schema";
import {
  findByKeyDataInputSchema,
  FindByKeyDataInputType,
  findByKeyDataOutputSchema,
  FindByKeyDataOutputType,
} from "./schemas/find-by-data.schema";
import {
  findByKeyIdInputSchema,
  FindByKeyIdInputType,
  findByKeyIdOutputSchema,
  FindByKeyIdOutputType,
} from "./schemas/find-by-id.schema";
import {
  findByKeyRefInputSchema,
  FindByKeyRefInputType,
  findByKeyRefOutputSchema,
  FindByKeyRefOutputType,
} from "./schemas/find-by-ref.schema";
import {
  updateByKeyIdInputSchema,
  UpdateByKeyIdInputType,
  updateByKeyIdOutputSchema,
  UpdateByKeyIdOutputType,
} from "./schemas/update-by-id.schema";
import {
  updateByKeyDataInputSchema,
  UpdateByKeyDataInputType,
  updateByKeyDataOutputSchema,
  UpdateByKeyDataOutputType,
} from "./schemas/update-by-data.schema";
import {
  deleteByKeyDataInputSchema,
  DeleteByKeyDataInputType,
  deleteByKeyDataOutputSchema,
  DeleteByKeyDataOutputType,
} from "./schemas/delete-by-data.schema";
import {
  deleteByKeyRefInputSchema,
  DeleteByKeyRefInputType,
  deleteByKeyRefOutputSchema,
  DeleteByKeyRefOutputType,
} from "./schemas/delete-by-ref.schema";
import { ClientsService } from "@/app/clients/clients.service";
import { ClientDocument } from "@/app/clients/entities/client.entity";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import { OrganizationDocument } from "@/app/organizations/entities/organization.entity";

@Router({
  alias: "keys",
})
@UseMiddlewares(LoggerMiddleware)
export class KeysRouter {
  private logger: Logger = new Logger(KeysRouter.name);

  constructor(
    private readonly keysService: KeysService,
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
    input: insertOneKeyInputSchema,
    output: insertOneKeyOutputSchema,
  })
  async insertOne(
    @Input() insertOneKeyInputData: InsertOneKeyInputType,
  ): Promise<InsertOneKeyOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOneKeyInputData,
        },
      });

      const key: KeyDocument = await this.keysService.insertOne({
        doc: insertOneKeyInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          key,
        },
      });

      return insertOneKeyOutputSchema.parse(key);
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
    input: insertManyKeyInputSchema,
    output: insertManyKeyOutputSchema,
  })
  async insertMany(
    @Input() insertManyKeyInputData: InsertManyKeyInputType,
  ): Promise<InsertManyKeyOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManyKeyInputData,
        },
      });

      const result: InsertManyResult<any> = await this.keysService.insertMany({
        docs: insertManyKeyInputData.docs,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManyKeyOutputSchema.parse(result);
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
    input: findByKeyIdInputSchema,
    output: findByKeyIdOutputSchema,
  })
  async findById(
    @Input() findByKeyIdInputData: FindByKeyIdInputType,
  ): Promise<FindByKeyIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findByKeyIdInputData,
        },
      });

      const [key]: KeyDocument[] = await this.keysService.find({
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

      return findByKeyIdOutputSchema.parse(key);
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
    input: findByKeyDataInputSchema,
    output: findByKeyDataOutputSchema,
  })
  async findByData(
    @Input() findByKeyDataInputData: FindByKeyDataInputType,
  ): Promise<FindByKeyDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findByKeyDataInputData,
        },
      });

      const filter = findByKeyDataInputData.filter.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => {
          if (!acc[key]) {
            acc[key] = { $in: [] };
          }
          acc[key]["$in"].push(obj[key]);
        });
        return acc;
      }, {});

      const keys: KeyDocument[] = await this.keysService.find({
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

      return findByKeyDataOutputSchema.parse(keys);
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
    input: findByKeyRefInputSchema,
    output: findByKeyRefOutputSchema,
  })
  async findByRef(
    @Input() findByKeyRefInputData: FindByKeyRefInputType,
  ): Promise<FindByKeyRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByRef.name,
        metadata: {
          findByKeyRefInputData,
        },
      });

      const clients: ClientDocument[] = await this.clientsService.find({
        filter: findByKeyRefInputData.filter.client,
        select: [],
        populate: [],
      });

      const client_ids = clients.map((client) => client._id.toString());
      if (findByKeyRefInputData.filter.key.client_id) {
        client_ids.push(findByKeyRefInputData.filter.key.client_id);
      }

      const organizations: OrganizationDocument[] =
        await this.organizationsService.find({
          filter: findByKeyRefInputData.filter.organization,
          select: [],
          populate: [],
        });

      const organization_ids = organizations.map((organization) =>
        organization._id.toString(),
      );
      if (findByKeyRefInputData.filter.key.organization_id) {
        organization_ids.push(findByKeyRefInputData.filter.key.organization_id);
      }

      const keys: KeyDocument[] = await this.keysService.find({
        filter: {
          ...findByKeyRefInputData.filter.key,
          client_id: { $in: client_ids },
          organization_id: { $in: organization_ids },
        },
        select: [],
        populate: ["client_id", "organization_id"],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByRef.name,
        metadata: {
          keys,
        },
      });

      return findByKeyRefOutputSchema.parse(keys);
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
    input: updateByKeyIdInputSchema,
    output: updateByKeyIdOutputSchema,
  })
  async updateById(
    @Input() updateByKeyIdInputData: UpdateByKeyIdInputType,
  ): Promise<UpdateByKeyIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByKeyIdInputData,
        },
      });

      const key = await this.keysService.findOneAndUpdate({
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

      return updateByKeyIdOutputSchema.parse(key);
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
    input: updateByKeyDataInputSchema,
    output: updateByKeyDataOutputSchema,
  })
  async updateByData(
    @Input()
    updateByKeyDataInputData: UpdateByKeyDataInputType,
  ): Promise<UpdateByKeyDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByKeyDataInputData,
        },
      });

      const filter = updateByKeyDataInputData.filter.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => {
          if (!acc[key]) {
            acc[key] = { $in: [] };
          }
          acc[key]["$in"].push(obj[key]);
        });
        return acc;
      }, {});

      const key = await this.keysService.updateMany({
        filter: filter,
        update: updateByKeyDataInputData.update,
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

      return updateByKeyDataOutputSchema.parse(key);
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
    input: deleteByKeyDataInputSchema,
    output: deleteByKeyDataOutputSchema,
  })
  async deleteByData(
    @Input()
    deleteByKeyDataInputData: DeleteByKeyDataInputType,
  ): Promise<DeleteByKeyDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteByKeyDataInputData,
        },
      });

      const filter = deleteByKeyDataInputData.filter.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => {
          if (!acc[key]) {
            acc[key] = { $in: [] };
          }
          acc[key]["$in"].push(obj[key]);
        });
        return acc;
      }, {});

      const delete_count: Number = await this.keysService.delete({
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          delete_count,
        },
      });

      return deleteByKeyDataOutputSchema.parse({ delete_count });
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
    input: deleteByKeyRefInputSchema,
    output: deleteByKeyRefOutputSchema,
  })
  async deleteByRef(
    @Input()
    deleteByKeyRefInputData: DeleteByKeyRefInputType,
  ): Promise<DeleteByKeyRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByRef.name,
        metadata: {
          deleteByKeyRefInputData,
        },
      });

      const clients: ClientDocument[] = await this.clientsService.find({
        filter: deleteByKeyRefInputData.filter.client,
        select: [],
        populate: [],
      });

      const client_ids = clients.map((client) => client._id.toString());
      if (deleteByKeyRefInputData.filter.key.client_id) {
        client_ids.push(deleteByKeyRefInputData.filter.key.client_id);
      }

      const organizations: OrganizationDocument[] =
        await this.organizationsService.find({
          filter: deleteByKeyRefInputData.filter.organization,
          select: [],
          populate: [],
        });

      const organization_ids = organizations.map((organization) =>
        organization._id.toString(),
      );
      if (deleteByKeyRefInputData.filter.key.organization_id) {
        organization_ids.push(
          deleteByKeyRefInputData.filter.key.organization_id,
        );
      }

      const delete_count: Number = await this.keysService.delete({
        filter: {
          ...deleteByKeyRefInputData.filter.key,
          client_id: { $in: client_ids },
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

      return deleteByKeyRefOutputSchema.parse({ delete_count });
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
