import { Logger } from "@nestjs/common";
import { InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { FormDocument, STATUS } from "@/app/forms/entities/form.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { FormsService } from "@/app/forms/forms.service";
import {
  insertOneFormInputSchema,
  InsertOneFormInputType,
  insertOneFormOutputSchema,
  InsertOneFormOutputType,
} from "./schemas/insert-one.schema";
import {
  insertManyFormInputSchema,
  InsertManyFormInputType,
  insertManyFormOutputSchema,
  InsertManyFormOutputType,
} from "./schemas/insert-many.schema";
import {
  findByFormDataInputSchema,
  FindByFormDataInputType,
  findByFormDataOutputSchema,
  FindByFormDataOutputType,
} from "./schemas/find-by-data.schema";
import {
  findByFormIdInputSchema,
  FindByFormIdInputType,
  findByFormIdOutputSchema,
  FindByFormIdOutputType,
} from "./schemas/find-by-id.schema";
import {
  findByFormRefInputSchema,
  FindByFormRefInputType,
  findByFormRefOutputSchema,
  FindByFormRefOutputType,
} from "./schemas/find-by-ref.schema";
import {
  updateByFormIdInputSchema,
  UpdateByFormIdInputType,
  updateByFormIdOutputSchema,
  UpdateByFormIdOutputType,
} from "./schemas/update-by-id.schema";
import {
  updateByFormDataInputSchema,
  UpdateByFormDataInputType,
  updateByFormDataOutputSchema,
  UpdateByFormDataOutputType,
} from "./schemas/update-by-data.schema";
import {
  deleteByFormDataInputSchema,
  DeleteByFormDataInputType,
  deleteByFormDataOutputSchema,
  DeleteByFormDataOutputType,
} from "./schemas/delete-by-data.schema";
import {
  deleteByFormRefInputSchema,
  DeleteByFormRefInputType,
  deleteByFormRefOutputSchema,
  DeleteByFormRefOutputType,
} from "./schemas/delete-by-ref.schema";
import { ClientsService } from "@/app/clients/clients.service";
import { ClientDocument } from "@/app/clients/entities/client.entity";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import { OrganizationDocument } from "@/app/organizations/entities/organization.entity";
import { EmailAppsService } from "@/app/email/apps/apps.service";
import { EmailAppDocument } from "@/app/email/apps/entities/app.entity";

@Router({
  alias: "forms",
})
@UseMiddlewares(LoggerMiddleware)
export class FormRouter {
  private logger: Logger = new Logger(FormRouter.name);

  constructor(
    private readonly formsService: FormsService,
    private readonly clientsService: ClientsService,
    private readonly organizationsService: OrganizationsService,
    private readonly emailAppsService: EmailAppsService,
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
    input: insertOneFormInputSchema,
    output: insertOneFormOutputSchema,
  })
  async insertOne(
    @Input() insertOneFormInputData: InsertOneFormInputType,
  ): Promise<InsertOneFormOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOneFormInputData,
        },
      });

      const form: FormDocument = await this.formsService.insertOne({
        doc: insertOneFormInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          form,
        },
      });

      return insertOneFormOutputSchema.parse(form);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        insertOneFormInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: insertManyFormInputSchema,
    output: insertManyFormOutputSchema,
  })
  async insertMany(
    @Input() insertManyFormInputData: InsertManyFormInputType,
  ): Promise<InsertManyFormOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManyFormInputData,
        },
      });

      const result: InsertManyResult<any> = await this.formsService.insertMany({
        docs: insertManyFormInputData.docs,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManyFormOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertMany.name,
        error: error,
        insertManyFormInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByFormIdInputSchema,
    output: findByFormIdOutputSchema,
  })
  async findById(
    @Input() findByFormIdInputData: FindByFormIdInputType,
  ): Promise<FindByFormIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findByFormIdInputData,
        },
      });

      const [form]: FormDocument[] = await this.formsService.find({
        filter: findByFormIdInputData.filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findById.name,
        metadata: {
          form,
        },
      });

      return findByFormIdOutputSchema.parse(form);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findById.name,
        error: error,
        findByFormIdInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByFormDataInputSchema,
    output: findByFormDataOutputSchema,
  })
  async findByData(
    @Input() findByFormDataInputData: FindByFormDataInputType,
  ): Promise<FindByFormDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findByFormDataInputData,
        },
      });

      const filter = findByFormDataInputData.filter.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => {
          if (!acc[key]) {
            acc[key] = { $in: [] };
          }
          acc[key]["$in"].push(obj[key]);
        });
        return acc;
      }, {});

      const forms: FormDocument[] = await this.formsService.find({
        filter: filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByData.name,
        metadata: {
          forms,
        },
      });

      return findByFormDataOutputSchema.parse(forms);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByData.name,
        error: error,
        findByFormDataInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByFormRefInputSchema,
    output: findByFormRefOutputSchema,
  })
  async findByRef(
    @Input() findByFormRefInputData: FindByFormRefInputType,
  ): Promise<FindByFormRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByRef.name,
        metadata: {
          findByFormRefInputData,
        },
      });

      const clients: ClientDocument[] = await this.clientsService.find({
        filter: findByFormRefInputData.filter.client,
        select: [],
        populate: [],
      });

      const client_ids = clients.map((client) => client._id.toString());
      if (findByFormRefInputData.filter.form.client_id) {
        client_ids.push(findByFormRefInputData.filter.form.client_id);
      }

      const organizations: OrganizationDocument[] =
        await this.organizationsService.find({
          filter: findByFormRefInputData.filter.organization,
          select: [],
          populate: [],
        });

      const organization_ids = organizations.map((organization) =>
        organization._id.toString(),
      );
      if (findByFormRefInputData.filter.form.organization_id) {
        organization_ids.push(
          findByFormRefInputData.filter.form.organization_id,
        );
      }

      const email_apps: EmailAppDocument[] = await this.emailAppsService.find({
        filter: findByFormRefInputData.filter.email_app,
        select: [],
        populate: [],
      });

      const email_app_ids = email_apps.map((email_app) =>
        email_app._id.toString(),
      );
      if (findByFormRefInputData.filter.form.email_app_id) {
        email_app_ids.push(findByFormRefInputData.filter.form.email_app_id);
      }

      const forms: FormDocument[] = await this.formsService.find({
        filter: {
          ...findByFormRefInputData.filter.form,
          client_id: { $in: client_ids },
          organization_id: { $in: organization_ids },
          email_app_id: { $in: email_app_ids },
        },
        select: [],
        populate: ["client_id", "organization_id", "email_app_id"],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByRef.name,
        metadata: {
          forms,
        },
      });

      return findByFormRefOutputSchema.parse(forms);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByRef.name,
        error: error,
        findByFormRefInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByFormIdInputSchema,
    output: updateByFormIdOutputSchema,
  })
  async updateById(
    @Input() updateByFormIdInputData: UpdateByFormIdInputType,
  ): Promise<UpdateByFormIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByFormIdInputData,
        },
      });

      const form = await this.formsService.findOneAndUpdate({
        filter: updateByFormIdInputData.filter,
        update: updateByFormIdInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          form,
        },
      });

      return updateByFormIdOutputSchema.parse(form);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByFormIdInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByFormDataInputSchema,
    output: updateByFormDataOutputSchema,
  })
  async updateByData(
    @Input()
    updateByFormDataInputData: UpdateByFormDataInputType,
  ): Promise<UpdateByFormDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByFormDataInputData,
        },
      });

      const filter = updateByFormDataInputData.filter.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => {
          if (!acc[key]) {
            acc[key] = { $in: [] };
          }
          acc[key]["$in"].push(obj[key]);
        });
        return acc;
      }, {});

      const key = await this.formsService.updateMany({
        filter: filter,
        update: updateByFormDataInputData.update,
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

      return updateByFormDataOutputSchema.parse(key);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByFormDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByFormDataInputSchema,
    output: deleteByFormDataOutputSchema,
  })
  async deleteByData(
    @Input()
    deleteByFormDataInputData: DeleteByFormDataInputType,
  ): Promise<DeleteByFormDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteByFormDataInputData,
        },
      });

      const filter = deleteByFormDataInputData.filter.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => {
          if (!acc[key]) {
            acc[key] = { $in: [] };
          }
          acc[key]["$in"].push(obj[key]);
        });
        return acc;
      }, {});

      const delete_count: Number = await this.formsService.delete({
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          delete_count,
        },
      });

      return deleteByFormDataOutputSchema.parse({ delete_count });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByData.name,
        error: error,
        deleteByFormDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByFormRefInputSchema,
    output: deleteByFormRefOutputSchema,
  })
  async deleteByRef(
    @Input()
    deleteByFormRefInputData: DeleteByFormRefInputType,
  ): Promise<DeleteByFormRefOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByRef.name,
        metadata: {
          deleteByFormRefInputData,
        },
      });

      const clients: ClientDocument[] = await this.clientsService.find({
        filter: deleteByFormRefInputData.filter.client,
        select: [],
        populate: [],
      });

      const client_ids = clients.map((client) => client._id.toString());
      if (deleteByFormRefInputData.filter.form.client_id) {
        client_ids.push(deleteByFormRefInputData.filter.form.client_id);
      }

      const organizations: OrganizationDocument[] =
        await this.organizationsService.find({
          filter: deleteByFormRefInputData.filter.organization,
          select: [],
          populate: [],
        });

      const organization_ids = organizations.map((organization) =>
        organization._id.toString(),
      );
      if (deleteByFormRefInputData.filter.form.organization_id) {
        organization_ids.push(
          deleteByFormRefInputData.filter.form.organization_id,
        );
      }

      const email_apps: EmailAppDocument[] = await this.emailAppsService.find({
        filter: deleteByFormRefInputData.filter.email_app,
        select: [],
        populate: [],
      });

      const email_app_ids = email_apps.map((email_app) =>
        email_app._id.toString(),
      );
      if (deleteByFormRefInputData.filter.form.email_app_id) {
        email_app_ids.push(deleteByFormRefInputData.filter.form.email_app_id);
      }

      const delete_count: Number = await this.formsService.delete({
        filter: {
          ...deleteByFormRefInputData.filter.form,
          client_id: { $in: client_ids },
          organization_id: { $in: organization_ids },
          email_app_id: { $in: email_app_ids },
        },
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByRef.name,
        metadata: {
          delete_count,
        },
      });

      return deleteByFormRefOutputSchema.parse({ delete_count });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByRef.name,
        error: error,
        deleteByFormRefInputData,
      });

      throw error;
    }
  }
}
