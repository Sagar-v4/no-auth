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
} from "./schemas/insert-one.schema";
import {
  insertManyEmailAppInputSchema,
  InsertManyEmailAppInputType,
  insertManyEmailAppOutputSchema,
  InsertManyEmailAppOutputType,
} from "./schemas/insert-many.schema";
import {
  findByEmailAppDataInputSchema,
  FindByEmailAppDataInputType,
  findByEmailAppDataOutputSchema,
  FindByEmailAppDataOutputType,
} from "./schemas/find-by-data.schema";
import {
  findByEmailAppIdInputSchema,
  FindByEmailAppIdInputType,
  findByEmailAppIdOutputSchema,
  FindByEmailAppIdOutputType,
} from "./schemas/find-by-id.schema";
import {
  findByEmailAppRefInputSchema,
  FindByEmailAppRefInputType,
  findByEmailAppRefOutputSchema,
  FindByEmailAppRefOutputType,
} from "./schemas/find-by-ref.schema";
import {
  updateByEmailAppIdInputSchema,
  UpdateByEmailAppIdInputType,
  updateByEmailAppIdOutputSchema,
  UpdateByEmailAppIdOutputType,
} from "./schemas/update-by-id.schema";
import {
  updateByEmailAppDataInputSchema,
  UpdateByEmailAppDataInputType,
  updateByEmailAppDataOutputSchema,
  UpdateByEmailAppDataOutputType,
} from "./schemas/update-by-data.schema";
import {
  deleteByEmailAppDataInputSchema,
  DeleteByEmailAppDataInputType,
  deleteByEmailAppDataOutputSchema,
  DeleteByEmailAppDataOutputType,
} from "./schemas/delete-by-data.schema";
import {
  deleteByEmailAppRefInputSchema,
  DeleteByEmailAppRefInputType,
  deleteByEmailAppRefOutputSchema,
  DeleteByEmailAppRefOutputType,
} from "./schemas/delete-by-ref.schema";
import { ClientsService } from "@/app/clients/clients.service";
import { ClientDocument } from "@/app/clients/entities/client.entity";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import { OrganizationDocument } from "@/app/organizations/entities/organization.entity";

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

      const filter = findByEmailAppDataInputData.filter.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => {
          if (!acc[key]) {
            acc[key] = { $in: [] };
          }
          acc[key]["$in"].push(obj[key]);
        });
        return acc;
      }, {});

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

      const clients: ClientDocument[] = await this.clientsService.find({
        filter: findByEmailAppRefInputData.filter.client,
        select: [],
        populate: [],
      });

      const client_ids = clients.map((client) => client._id.toString());
      if (findByEmailAppRefInputData.filter.email_app.client_id) {
        client_ids.push(findByEmailAppRefInputData.filter.email_app.client_id);
      }

      const organizations: OrganizationDocument[] =
        await this.organizationsService.find({
          filter: findByEmailAppRefInputData.filter.organization,
          select: [],
          populate: [],
        });

      const organization_ids = organizations.map((organization) =>
        organization._id.toString(),
      );
      if (findByEmailAppRefInputData.filter.email_app.organization_id) {
        organization_ids.push(
          findByEmailAppRefInputData.filter.email_app.organization_id,
        );
      }

      const email_apps: EmailAppDocument[] = await this.emailAppsService.find({
        filter: {
          ...findByEmailAppRefInputData.filter.email_app,
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
          email_apps,
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

      const filter = updateByEmailAppDataInputData.filter.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => {
          if (!acc[key]) {
            acc[key] = { $in: [] };
          }
          acc[key]["$in"].push(obj[key]);
        });
        return acc;
      }, {});

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

      const filter = deleteByEmailAppDataInputData.filter.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => {
          if (!acc[key]) {
            acc[key] = { $in: [] };
          }
          acc[key]["$in"].push(obj[key]);
        });
        return acc;
      }, {});

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

      const clients: ClientDocument[] = await this.clientsService.find({
        filter: deleteByEmailAppRefInputData.filter.client,
        select: [],
        populate: [],
      });

      const client_ids = clients.map((client) => client._id.toString());
      if (deleteByEmailAppRefInputData.filter.email_app.client_id) {
        client_ids.push(
          deleteByEmailAppRefInputData.filter.email_app.client_id,
        );
      }

      const organizations: OrganizationDocument[] =
        await this.organizationsService.find({
          filter: deleteByEmailAppRefInputData.filter.organization,
          select: [],
          populate: [],
        });

      const organization_ids = organizations.map((organization) =>
        organization._id.toString(),
      );
      if (deleteByEmailAppRefInputData.filter.email_app.organization_id) {
        organization_ids.push(
          deleteByEmailAppRefInputData.filter.email_app.organization_id,
        );
      }

      const delete_count: Number = await this.emailAppsService.delete({
        filter: {
          ...deleteByEmailAppRefInputData.filter.email_app,
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
