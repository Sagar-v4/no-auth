import { Logger } from "@nestjs/common";
import { DeleteResult, InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { SSODocument } from "@/app/sso/entities/sso.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { SSOV1Service } from "@/app/sso/services/sso.v1.service";
import {
  insertOneSSOInput,
  InsertOneSSOInput,
  insertOneSSOOutput,
  InsertOneSSOOutput,
  insertManySSOInput,
  InsertManySSOInput,
  insertManySSOOutput,
  InsertManySSOOutput,
  findBySSODataInput,
  FindBySSODataInput,
  findBySSODataOutput,
  FindBySSODataOutput,
  findBySSOIdInput,
  FindBySSOIdInput,
  findBySSOIdOutput,
  FindBySSOIdOutput,
  findBySSORefInput,
  FindBySSORefInput,
  findBySSORefOutput,
  FindBySSORefOutput,
  updateBySSOIdInput,
  UpdateBySSOIdInput,
  updateBySSOIdOutput,
  UpdateBySSOIdOutput,
  updateBySSODataInput,
  UpdateBySSODataInput,
  updateBySSODataOutput,
  UpdateBySSODataOutput,
  deleteBySSODataInput,
  DeleteBySSODataInput,
  deleteBySSODataOutput,
  DeleteBySSODataOutput,
  deleteBySSORefInput,
  DeleteBySSORefInput,
  deleteBySSORefOutput,
  DeleteBySSORefOutput,
} from "../../../../../../libs/trpc/schemas/v1/sso";
import { query$or } from "@/utils/query-builder";
import { concatIds } from "@/utils/query-filter";
import { EmailServicesV1Service } from "@/app/email/services/services/services.v1.service";
import { BasicService } from "@/app/basic/basic.service";

@Router({
  alias: "ssoV1",
})
@UseMiddlewares(LoggerMiddleware)
export class SSOV1Router {
  private logger: Logger = new Logger(SSOV1Router.name);

  constructor(
    private readonly ssoService: SSOV1Service,
    private readonly emailServicesService: EmailServicesV1Service,
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
    input: insertOneSSOInput,
    output: insertOneSSOOutput,
  })
  async insertOne(
    @Input() insertOneSSOInputData: InsertOneSSOInput,
  ): Promise<InsertOneSSOOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOneSSOInputData,
        },
      });

      const sso: SSODocument = await this.basicService.insertOne({
        schema: "SSO",
        doc: insertOneSSOInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          sso,
        },
      });

      return insertOneSSOOutput.parse(sso);
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
    input: insertManySSOInput,
    output: insertManySSOOutput,
  })
  async insertMany(
    @Input() insertManySSOInputData: InsertManySSOInput,
  ): Promise<InsertManySSOOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManySSOInputData,
        },
      });

      const result: InsertManyResult<any> = await this.basicService.insertMany({
        schema: "SSO",
        doc: insertManySSOInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManySSOOutput.parse(result);
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
    input: findBySSOIdInput,
    output: findBySSOIdOutput,
  })
  async findById(
    @Input() findBySSOIdInputData: FindBySSOIdInput,
  ): Promise<FindBySSOIdOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findBySSOIdInputData,
        },
      });

      const [sso]: SSODocument[] = await this.basicService.find({
        schema: "SSO",
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

      return findBySSOIdOutput.parse(sso);
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
    input: findBySSODataInput,
    output: findBySSODataOutput,
  })
  async findByData(
    @Input() findBySSODataInputData: FindBySSODataInput,
  ): Promise<FindBySSODataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findBySSODataInputData,
        },
      });

      const filter = query$or(findBySSODataInputData.filter);

      const sso: SSODocument[] = await this.basicService.find({
        schema: "SSO",
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

      return findBySSODataOutput.parse(sso);
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
    input: findBySSORefInput,
    output: findBySSORefOutput,
  })
  async findByRef(
    @Input() findBySSORefInputData: FindBySSORefInput,
  ): Promise<FindBySSORefOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByRef.name,
        metadata: {
          findBySSORefInputData,
        },
      });

      const user_ids = concatIds(
        [findBySSORefInputData.filter.sso.user_id],
        await this.basicService.getIds({
          schema: "User",
          filter: findBySSORefInputData.filter.user,
        }),
      );
      const organization_ids = concatIds(
        [findBySSORefInputData.filter.sso.organization_id],
        await this.basicService.getIds({
          schema: "Organization",
          filter: findBySSORefInputData.filter.organization,
        }),
      );

      const references_ids = new Map<string, { $in: string[] }>();
      if (user_ids.length > 0) {
        references_ids.set("user_id", {
          $in: user_ids,
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

      const sso: SSODocument[] = await this.basicService.find({
        schema: "SSO",
        filter: {
          ...findBySSORefInputData.filter.sso,
          ...Object.fromEntries(references_ids),
        },
        select: [],
        populate: ["user_id", "organization_id"],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByRef.name,
        metadata: {
          sso,
        },
      });

      return findBySSORefOutput.parse(sso);
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
    input: updateBySSOIdInput,
    output: updateBySSOIdOutput,
  })
  async updateById(
    @Input() updateBySSOIdInputData: UpdateBySSOIdInput,
  ): Promise<UpdateBySSOIdOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateBySSOIdInputData,
        },
      });

      const sso = await this.basicService.findOneAndUpdate({
        schema: "SSO",
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

      return updateBySSOIdOutput.parse(sso);
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
    input: updateBySSODataInput,
    output: updateBySSODataOutput,
  })
  async updateByData(
    @Input()
    updateBySSODataInputData: UpdateBySSODataInput,
  ): Promise<UpdateBySSODataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateBySSODataInputData,
        },
      });

      const filter = query$or(updateBySSODataInputData.filter);

      const result = await this.basicService.updateMany({
        schema: "SSO",
        filter: filter,
        update: updateBySSODataInputData.update,
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

      return updateBySSODataOutput.parse(result);
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
    input: deleteBySSODataInput,
    output: deleteBySSODataOutput,
  })
  async deleteByData(
    @Input()
    deleteBySSODataInputData: DeleteBySSODataInput,
  ): Promise<DeleteBySSODataOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteBySSODataInputData,
        },
      });

      const filter = query$or(deleteBySSODataInputData.filter);

      const result: DeleteResult = await this.basicService.delete({
        schema: "SSO",
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          result,
        },
      });

      return deleteBySSODataOutput.parse(result);
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
    input: deleteBySSORefInput,
    output: deleteBySSORefOutput,
  })
  async deleteByRef(
    @Input()
    deleteBySSORefInputData: DeleteBySSORefInput,
  ): Promise<DeleteBySSORefOutput> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByRef.name,
        metadata: {
          deleteBySSORefInputData,
        },
      });

      const user_ids = concatIds(
        [deleteBySSORefInputData.filter.sso.user_id],
        await this.basicService.getIds({
          schema: "User",
          filter: deleteBySSORefInputData.filter.user,
        }),
      );
      const organization_ids = concatIds(
        [deleteBySSORefInputData.filter.sso.organization_id],
        await this.basicService.getIds({
          schema: "Organization",
          filter: deleteBySSORefInputData.filter.organization,
        }),
      );

      const references_ids = new Map<string, { $in: string[] }>();
      if (user_ids.length > 0) {
        references_ids.set("user_id", {
          $in: user_ids,
        });
      }
      if (organization_ids.length > 0) {
        references_ids.set("organization_id", {
          $in: organization_ids,
        });
      }

      const result: DeleteResult = await this.basicService.delete({
        schema: "SSO",
        filter: {
          ...deleteBySSORefInputData.filter.sso,
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

      return deleteBySSORefOutput.parse(result);
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
