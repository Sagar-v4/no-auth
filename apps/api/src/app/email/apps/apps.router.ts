import { Logger } from "@nestjs/common";
import { InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { EmailAppDocument, STATUS } from "@/app/email/apps/entities/app.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { EmailAppsService } from "@/app/email/apps/apps.service";
import {
  insertOneEmailAppInputSchema,
  InsertOneEmailAppInputType,
  insertOneEmailAppOutputSchema,
  InsertOneEmailAppOutputType,
  insertManyEmailAppInputSchema,
  InsertManyEmailAppInputType,
  insertManyEmailAppOutputSchema,
  InsertManyEmailAppOutputType,
  findByEmailAppDataInputSchema,
  FindByEmailAppDataInputType,
  findByEmailAppDataOutputSchema,
  FindByEmailAppDataOutputType,
  findByEmailAppIdInputSchema,
  FindByEmailAppIdInputType,
  findByEmailAppIdOutputSchema,
  FindByEmailAppIdOutputType,
  findByEmailAppRefInputSchema,
  FindByEmailAppRefInputType,
  findByEmailAppRefOutputSchema,
  FindByEmailAppRefOutputType,
  updateByEmailAppIdInputSchema,
  UpdateByEmailAppIdInputType,
  updateByEmailAppIdOutputSchema,
  UpdateByEmailAppIdOutputType,
  updateByEmailAppDataInputSchema,
  UpdateByEmailAppDataInputType,
  updateByEmailAppDataOutputSchema,
  UpdateByEmailAppDataOutputType,
  deleteByEmailAppDataInputSchema,
  DeleteByEmailAppDataInputType,
  deleteByEmailAppDataOutputSchema,
  DeleteByEmailAppDataOutputType,
  deleteByEmailAppRefInputSchema,
  DeleteByEmailAppRefInputType,
  deleteByEmailAppRefOutputSchema,
  DeleteByEmailAppRefOutputType,
} from "../../../../../../libs/trpc/schemas/email/apps";
import { ClientsService } from "@/app/clients/clients.service";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";

@Router({
  alias: "emailApps",
})
@UseMiddlewares(LoggerMiddleware)
export class EmailAppRouter {
  private logger: Logger = new Logger(EmailAppRouter.name);

  constructor(
    private readonly emailAppsService: EmailAppsService,
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
    input: insertOneEmailAppInputSchema,
    output: insertOneEmailAppOutputSchema,
  })
  async insertOne(
    @Input() insertOneEmailAppInputData: InsertOneEmailAppInputType,
  ): Promise<InsertOneEmailAppOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOneEmailAppInputData,
        },
      });

      const email_app: EmailAppDocument = await this.emailAppsService.insertOne(
        {
          doc: insertOneEmailAppInputData.doc,
        },
      );

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          email_app,
        },
      });

      return insertOneEmailAppOutputSchema.parse(email_app);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        insertOneEmailAppInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: insertManyEmailAppInputSchema,
    output: insertManyEmailAppOutputSchema,
  })
  async insertMany(
    @Input() insertManyEmailAppInputData: InsertManyEmailAppInputType,
  ): Promise<InsertManyEmailAppOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManyEmailAppInputData,
        },
      });

      const result: InsertManyResult<any> =
        await this.emailAppsService.insertMany({
          docs: insertManyEmailAppInputData.docs,
        });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManyEmailAppOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertMany.name,
        error: error,
        insertManyEmailAppInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByEmailAppIdInputSchema,
    output: findByEmailAppIdOutputSchema,
  })
  async findById(
    @Input() findByEmailAppIdInputData: FindByEmailAppIdInputType,
  ): Promise<FindByEmailAppIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findByEmailAppIdInputData,
        },
      });

      const [email_app]: EmailAppDocument[] = await this.emailAppsService.find({
        filter: findByEmailAppIdInputData.filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findById.name,
        metadata: {
          email_app,
        },
      });

      return findByEmailAppIdOutputSchema.parse(email_app);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findById.name,
        error: error,
        findByEmailAppIdInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByEmailAppDataInputSchema,
    output: findByEmailAppDataOutputSchema,
  })
  async findByData(
    @Input() findByEmailAppDataInputData: FindByEmailAppDataInputType,
  ): Promise<FindByEmailAppDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findByEmailAppDataInputData,
        },
      });

      const filter = query$or(findByEmailAppDataInputData.filter);

      const email_apps: EmailAppDocument[] = await this.emailAppsService.find({
        filter: filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByData.name,
        metadata: {
          email_apps,
        },
      });

      return findByEmailAppDataOutputSchema.parse(email_apps);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByData.name,
        error: error,
        findByEmailAppDataInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByEmailAppRefInputSchema,
    output: findByEmailAppRefOutputSchema,
  })
  async findByRef(
    @Input() findByEmailAppRefInputData: FindByEmailAppRefInputType,
  ): Promise<FindByEmailAppRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByRef.name,
        metadata: {
          findByEmailAppRefInputData,
        },
      });

      const client_ids = concatIds(
        [findByEmailAppRefInputData.filter.email_app.client_id],
        await this.clientsService.getIds(
          findByEmailAppRefInputData.filter.client,
        ),
      );
      const organization_ids = concatIds(
        [findByEmailAppRefInputData.filter.email_app.organization_id],
        await this.organizationsService.getIds(
          findByEmailAppRefInputData.filter.organization,
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
        Object.keys(findByEmailAppRefInputData.filter.email_app).length === 0
      ) {
        this.logger.warn({
          action: "Exit",
          method: this.findByRef.name,
          metadata: {
            references_ids,
            email_app: Object.keys(findByEmailAppRefInputData.filter.email_app),
          },
        });
        return [];
      }

      const email_apps: EmailAppDocument[] = await this.emailAppsService.find({
        filter: {
          ...findByEmailAppRefInputData.filter.email_app,
          ...Object.fromEntries(references_ids),
        },
        select: [],
        populate: ["client_id", "organization_id"],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByRef.name,
        metadata: {
          // email_apps,
        },
      });

      return findByEmailAppRefOutputSchema.parse(email_apps);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByRef.name,
        error: error,
        findByEmailAppRefInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByEmailAppIdInputSchema,
    output: updateByEmailAppIdOutputSchema,
  })
  async updateById(
    @Input() updateByEmailAppIdInputData: UpdateByEmailAppIdInputType,
  ): Promise<UpdateByEmailAppIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByEmailAppIdInputData,
        },
      });

      const email_app = await this.emailAppsService.findOneAndUpdate({
        filter: updateByEmailAppIdInputData.filter,
        update: updateByEmailAppIdInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          email_app,
        },
      });

      return updateByEmailAppIdOutputSchema.parse(email_app);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByEmailAppIdInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByEmailAppDataInputSchema,
    output: updateByEmailAppDataOutputSchema,
  })
  async updateByData(
    @Input()
    updateByEmailAppDataInputData: UpdateByEmailAppDataInputType,
  ): Promise<UpdateByEmailAppDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByEmailAppDataInputData,
        },
      });

      const filter = query$or(updateByEmailAppDataInputData.filter);

      const key = await this.emailAppsService.updateMany({
        filter: filter,
        update: updateByEmailAppDataInputData.update,
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

      return updateByEmailAppDataOutputSchema.parse(key);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByEmailAppDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByEmailAppDataInputSchema,
    output: deleteByEmailAppDataOutputSchema,
  })
  async deleteByData(
    @Input()
    deleteByEmailAppDataInputData: DeleteByEmailAppDataInputType,
  ): Promise<DeleteByEmailAppDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteByEmailAppDataInputData,
        },
      });

      const filter = query$or(deleteByEmailAppDataInputData.filter);

      const delete_count: Number = await this.emailAppsService.delete({
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          delete_count,
        },
      });

      return deleteByEmailAppDataOutputSchema.parse({ delete_count });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByData.name,
        error: error,
        deleteByEmailAppDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByEmailAppRefInputSchema,
    output: deleteByEmailAppRefOutputSchema,
  })
  async deleteByRef(
    @Input()
    deleteByEmailAppRefInputData: DeleteByEmailAppRefInputType,
  ): Promise<DeleteByEmailAppRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByRef.name,
        metadata: {
          deleteByEmailAppRefInputData,
        },
      });

      const client_ids = concatIds(
        [deleteByEmailAppRefInputData.filter.email_app.client_id],
        await this.clientsService.getIds(
          deleteByEmailAppRefInputData.filter.client,
        ),
      );
      const organization_ids = concatIds(
        [deleteByEmailAppRefInputData.filter.email_app.organization_id],
        await this.organizationsService.getIds(
          deleteByEmailAppRefInputData.filter.organization,
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
        Object.keys(deleteByEmailAppRefInputData.filter.email_app).length === 0
      ) {
        this.logger.warn({
          action: "Exit",
          method: this.deleteByRef.name,
          metadata: {
            references_ids,
            email_app: Object.keys(
              deleteByEmailAppRefInputData.filter.email_app,
            ),
          },
        });
        return { delete_count: 0 };
      }

      const delete_count: Number = await this.emailAppsService.delete({
        filter: {
          ...deleteByEmailAppRefInputData.filter.email_app,
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

      return deleteByEmailAppRefOutputSchema.parse({ delete_count });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByRef.name,
        error: error,
        deleteByEmailAppRefInputData,
      });

      throw error;
    }
  }
}
