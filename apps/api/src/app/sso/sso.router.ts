import { Logger } from "@nestjs/common";
import { InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { SSODocument } from "@/app/sso/entities/sso.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { SSOService } from "@/app/sso/sso.service";
import {
  insertOneSSOInputSchema,
  InsertOneSSOInputType,
  insertOneSSOOutputSchema,
  InsertOneSSOOutputType,
  insertManySSOInputSchema,
  InsertManySSOInputType,
  insertManySSOOutputSchema,
  InsertManySSOOutputType,
  findBySSODataInputSchema,
  FindBySSODataInputType,
  findBySSODataOutputSchema,
  FindBySSODataOutputType,
  findBySSOIdInputSchema,
  FindBySSOIdInputType,
  findBySSOIdOutputSchema,
  FindBySSOIdOutputType,
  findBySSORefInputSchema,
  FindBySSORefInputType,
  findBySSORefOutputSchema,
  FindBySSORefOutputType,
  updateBySSOIdInputSchema,
  UpdateBySSOIdInputType,
  updateBySSOIdOutputSchema,
  UpdateBySSOIdOutputType,
  updateBySSODataInputSchema,
  UpdateBySSODataInputType,
  updateBySSODataOutputSchema,
  UpdateBySSODataOutputType,
  deleteBySSODataInputSchema,
  DeleteBySSODataInputType,
  deleteBySSODataOutputSchema,
  DeleteBySSODataOutputType,
  deleteBySSORefInputSchema,
  DeleteBySSORefInputType,
  deleteBySSORefOutputSchema,
  DeleteBySSORefOutputType,
} from "../../../../../libs/trpc/schemas/sso";
import { ClientsService } from "@/app/clients/clients.service";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";

@Router({
  alias: "sso",
})
@UseMiddlewares(LoggerMiddleware)
export class SSORouter {
  private logger: Logger = new Logger(SSORouter.name);

  constructor(
    private readonly ssoService: SSOService,
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
    input: insertOneSSOInputSchema,
    output: insertOneSSOOutputSchema,
  })
  async insertOne(
    @Input() insertOneSSOInputData: InsertOneSSOInputType,
  ): Promise<InsertOneSSOOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOneSSOInputData,
        },
      });

      const sso: SSODocument = await this.ssoService.insertOne({
        doc: insertOneSSOInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          sso,
        },
      });

      return insertOneSSOOutputSchema.parse(sso);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        insertOneSSOInputData,
      });

      throw error;
    }
  }
  @Mutation({
    input: insertManySSOInputSchema,
    output: insertManySSOOutputSchema,
  })
  async insertMany(
    @Input() insertManySSOInputData: InsertManySSOInputType,
  ): Promise<InsertManySSOOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManySSOInputData,
        },
      });

      const result: InsertManyResult<any> = await this.ssoService.insertMany({
        docs: insertManySSOInputData.docs,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManySSOOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertMany.name,
        error: error,
        insertManySSOInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findBySSOIdInputSchema,
    output: findBySSOIdOutputSchema,
  })
  async findById(
    @Input() findBySSOIdInputData: FindBySSOIdInputType,
  ): Promise<FindBySSOIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findBySSOIdInputData,
        },
      });

      const [sso]: SSODocument[] = await this.ssoService.find({
        filter: findBySSOIdInputData.filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findById.name,
        metadata: {
          sso,
        },
      });

      return findBySSOIdOutputSchema.parse(sso);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findById.name,
        error: error,
        findBySSOIdInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findBySSODataInputSchema,
    output: findBySSODataOutputSchema,
  })
  async findByData(
    @Input() findBySSODataInputData: FindBySSODataInputType,
  ): Promise<FindBySSODataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findBySSODataInputData,
        },
      });

      const filter = query$or(findBySSODataInputData.filter);

      const sso: SSODocument[] = await this.ssoService.find({
        filter: filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByData.name,
        metadata: {
          sso,
        },
      });

      return findBySSODataOutputSchema.parse(sso);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByData.name,
        error: error,
        findBySSODataInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findBySSORefInputSchema,
    output: findBySSORefOutputSchema,
  })
  async findByRef(
    @Input() findBySSORefInputData: FindBySSORefInputType,
  ): Promise<FindBySSORefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByRef.name,
        metadata: {
          findBySSORefInputData,
        },
      });

      const client_ids = concatIds(
        [findBySSORefInputData.filter.sso.client_id],
        await this.clientsService.getIds(findBySSORefInputData.filter.client),
      );
      const organization_ids = concatIds(
        [findBySSORefInputData.filter.sso.organization_id],
        await this.organizationsService.getIds(
          findBySSORefInputData.filter.organization,
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
        Object.keys(findBySSORefInputData.filter.sso).length === 0
      ) {
        this.logger.warn({
          action: "Exit",
          method: this.findByRef.name,
          metadata: {
            references_ids,
            key: Object.keys(findBySSORefInputData.filter.sso),
          },
        });
        return [];
      }

      const sso: SSODocument[] = await this.ssoService.find({
        filter: {
          ...findBySSORefInputData.filter.sso,
          ...Object.fromEntries(references_ids),
        },
        select: [],
        populate: ["client_id", "organization_id"],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByRef.name,
        metadata: {
          sso,
        },
      });

      return findBySSORefOutputSchema.parse(sso);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByRef.name,
        error: error,
        findBySSORefInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateBySSOIdInputSchema,
    output: updateBySSOIdOutputSchema,
  })
  async updateById(
    @Input() updateBySSOIdInputData: UpdateBySSOIdInputType,
  ): Promise<UpdateBySSOIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateBySSOIdInputData,
        },
      });

      const sso = await this.ssoService.findOneAndUpdate({
        filter: updateBySSOIdInputData.filter,
        update: updateBySSOIdInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          sso,
        },
      });

      return updateBySSOIdOutputSchema.parse(sso);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateBySSOIdInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateBySSODataInputSchema,
    output: updateBySSODataOutputSchema,
  })
  async updateByData(
    @Input()
    updateBySSODataInputData: UpdateBySSODataInputType,
  ): Promise<UpdateBySSODataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateBySSODataInputData,
        },
      });

      const filter = query$or(updateBySSODataInputData.filter);

      const sso = await this.ssoService.updateMany({
        filter: filter,
        update: updateBySSODataInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          sso,
        },
      });

      return updateBySSODataOutputSchema.parse(sso);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateBySSODataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteBySSODataInputSchema,
    output: deleteBySSODataOutputSchema,
  })
  async deleteByData(
    @Input()
    deleteBySSODataInputData: DeleteBySSODataInputType,
  ): Promise<DeleteBySSODataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteBySSODataInputData,
        },
      });

      const filter = query$or(deleteBySSODataInputData.filter);

      const delete_count: Number = await this.ssoService.delete({
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          delete_count,
        },
      });

      return deleteBySSODataOutputSchema.parse({ delete_count });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByData.name,
        error: error,
        deleteBySSODataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteBySSORefInputSchema,
    output: deleteBySSORefOutputSchema,
  })
  async deleteByRef(
    @Input()
    deleteBySSORefInputData: DeleteBySSORefInputType,
  ): Promise<DeleteBySSORefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByRef.name,
        metadata: {
          deleteBySSORefInputData,
        },
      });

      const client_ids = concatIds(
        [deleteBySSORefInputData.filter.sso.client_id],
        await this.clientsService.getIds(deleteBySSORefInputData.filter.client),
      );
      const organization_ids = concatIds(
        [deleteBySSORefInputData.filter.sso.organization_id],
        await this.organizationsService.getIds(
          deleteBySSORefInputData.filter.organization,
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
        Object.keys(deleteBySSORefInputData.filter.sso).length === 0
      ) {
        this.logger.warn({
          action: "Exit",
          method: this.findByRef.name,
          metadata: {
            references_ids,
            sso: Object.keys(deleteBySSORefInputData.filter.sso),
          },
        });
        return { delete_count: 0 };
      }

      const delete_count: Number = await this.ssoService.delete({
        filter: {
          ...deleteBySSORefInputData.filter.sso,
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

      return deleteBySSORefOutputSchema.parse({ delete_count });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByRef.name,
        error: error,
        deleteBySSORefInputData,
      });

      throw error;
    }
  }
}
