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
} from "../../../../../libs/trpc/schemas/forms/insert-one.schema";
import {
  insertManyFormInputSchema,
  InsertManyFormInputType,
  insertManyFormOutputSchema,
  InsertManyFormOutputType,
} from "../../../../../libs/trpc/schemas/forms/insert-many.schema";
import {
  findByFormDataInputSchema,
  FindByFormDataInputType,
  findByFormDataOutputSchema,
  FindByFormDataOutputType,
} from "../../../../../libs/trpc/schemas/forms/find-by-data.schema";
import {
  findByFormIdInputSchema,
  FindByFormIdInputType,
  findByFormIdOutputSchema,
  FindByFormIdOutputType,
} from "../../../../../libs/trpc/schemas/forms/find-by-id.schema";
import {
  findByFormRefInputSchema,
  FindByFormRefInputType,
  findByFormRefOutputSchema,
  FindByFormRefOutputType,
} from "../../../../../libs/trpc/schemas/forms/find-by-ref.schema";
import {
  updateByFormIdInputSchema,
  UpdateByFormIdInputType,
  updateByFormIdOutputSchema,
  UpdateByFormIdOutputType,
} from "../../../../../libs/trpc/schemas/forms/update-by-id.schema";
import {
  updateByFormDataInputSchema,
  UpdateByFormDataInputType,
  updateByFormDataOutputSchema,
  UpdateByFormDataOutputType,
} from "../../../../../libs/trpc/schemas/forms/update-by-data.schema";
import {
  deleteByFormDataInputSchema,
  DeleteByFormDataInputType,
  deleteByFormDataOutputSchema,
  DeleteByFormDataOutputType,
} from "../../../../../libs/trpc/schemas/forms/delete-by-data.schema";
import {
  deleteByFormRefInputSchema,
  DeleteByFormRefInputType,
  deleteByFormRefOutputSchema,
  DeleteByFormRefOutputType,
} from "../../../../../libs/trpc/schemas/forms/delete-by-ref.schema";
import { ClientsService } from "@/app/clients/clients.service";
import { OrganizationsService } from "@/app/organizations/organizations.service";
import { EmailAppsService } from "@/app/email/apps/apps.service";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";

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

      const filter = query$or(findByFormDataInputData.filter);

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

      const client_ids = concatIds(
        [findByFormRefInputData.filter.form.client_id],
        await this.clientsService.getIds(findByFormRefInputData.filter.client),
      );
      const organization_ids = concatIds(
        [findByFormRefInputData.filter.form.organization_id],
        await this.organizationsService.getIds(
          findByFormRefInputData.filter.organization,
        ),
      );
      const email_app_ids = concatIds(
        [findByFormRefInputData.filter.form.email_app_id],
        await this.emailAppsService.getIds(
          findByFormRefInputData.filter.email_app,
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
      if (email_app_ids.length > 0) {
        references_ids.set("email_app_id", {
          $in: email_app_ids,
        });
      }

      if (
        references_ids.size === 0 &&
        Object.keys(findByFormRefInputData.filter.form).length === 0
      ) {
        this.logger.warn({
          action: "Exit",
          method: this.findByRef.name,
          metadata: {
            references_ids,
            form: Object.keys(findByFormRefInputData.filter.form),
          },
        });
        return [];
      }

      const forms: FormDocument[] = await this.formsService.find({
        filter: {
          ...findByFormRefInputData.filter.form,
          ...Object.fromEntries(references_ids),
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

      const filter = query$or(updateByFormDataInputData.filter);

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

      const filter = query$or(deleteByFormDataInputData.filter);

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

      const client_ids = concatIds(
        [deleteByFormRefInputData.filter.form.client_id],
        await this.clientsService.getIds(
          deleteByFormRefInputData.filter.client,
        ),
      );
      const organization_ids = concatIds(
        [deleteByFormRefInputData.filter.form.organization_id],
        await this.organizationsService.getIds(
          deleteByFormRefInputData.filter.organization,
        ),
      );
      const email_app_ids = concatIds(
        [deleteByFormRefInputData.filter.form.email_app_id],
        await this.emailAppsService.getIds(
          deleteByFormRefInputData.filter.email_app,
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
      if (email_app_ids.length > 0) {
        references_ids.set("email_app_id", {
          $in: email_app_ids,
        });
      }

      if (
        references_ids.size === 0 &&
        Object.keys(deleteByFormRefInputData.filter.form).length === 0
      ) {
        this.logger.warn({
          action: "Exit",
          method: this.deleteByRef.name,
          metadata: {
            references_ids,
            form: Object.keys(deleteByFormRefInputData.filter.form),
          },
        });
        return { delete_count: 0 };
      }

      const delete_count: Number = await this.formsService.delete({
        filter: {
          ...deleteByFormRefInputData.filter.form,
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
