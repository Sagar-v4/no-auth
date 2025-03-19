import { Logger } from "@nestjs/common";
import { DeleteResult, InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { UsersService } from "@/app/users/users.service";
import { UserDocument } from "@/app/users/entities/user.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import {
  insertOneUserInputSchema,
  InsertOneUserInputType,
  insertOneUserOutputSchema,
  InsertOneUserOutputType,
  insertManyUserInputSchema,
  InsertManyUserInputType,
  insertManyUserOutputSchema,
  InsertManyUserOutputType,
  findByUserIdInputSchema,
  FindByUserIdInputType,
  findByUserIdOutputSchema,
  FindByUserIdOutputType,
  findByUserDataInputSchema,
  FindByUserDataInputType,
  findByUserDataOutputSchema,
  FindByUserDataOutputType,
  updateByUserIdInputSchema,
  UpdateByUserIdInputType,
  updateByUserIdOutputSchema,
  UpdateByUserIdOutputType,
  updateByUserDataInputSchema,
  UpdateByUserDataInputType,
  updateByUserDataOutputSchema,
  UpdateByUserDataOutputType,
  deleteByUserDataInputSchema,
  DeleteByUserDataInputType,
  deleteByUserDataOutputSchema,
  DeleteByUserDataOutputType,
} from "../../../../../libs/trpc/schemas/users";
import { query$or } from "@/utils/query-builder";
import { BasicService } from "@/app/basic/basic.service";

@Router({
  alias: "users",
})
@UseMiddlewares(LoggerMiddleware)
export class UsersRouter {
  private logger: Logger = new Logger(UsersRouter.name);

  constructor(
    private readonly usersService: UsersService,
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
    input: insertOneUserInputSchema,
    output: insertOneUserOutputSchema,
  })
  async insertOne(
    @Input() insertOneUserInputData: InsertOneUserInputType,
  ): Promise<InsertOneUserOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertOne.name,
        metadata: {
          insertOneUserInputData,
        },
      });

      const user: UserDocument = await this.basicService.insertOne({
        schema: "User",
        doc: insertOneUserInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertOne.name,
        metadata: {
          user,
        },
      });

      return insertOneUserOutputSchema.parse(user);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertOne.name,
        error: error,
        insertOneUserInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: insertManyUserInputSchema,
    output: insertManyUserOutputSchema,
  })
  async insertMany(
    @Input() insertManyUserInputData: InsertManyUserInputType,
  ): Promise<InsertManyUserOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.insertMany.name,
        metadata: {
          insertManyUserInputData,
        },
      });

      const result: InsertManyResult<any> = await this.basicService.insertMany({
        schema: "User",
        doc: insertManyUserInputData.doc,
      });

      this.logger.log({
        action: "Exit",
        method: this.insertMany.name,
        metadata: {
          result,
        },
      });

      return insertManyUserOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.insertMany.name,
        error: error,
        insertManyUserInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByUserIdInputSchema,
    output: findByUserIdOutputSchema,
  })
  async findById(
    @Input() findByUserIdInputData: FindByUserIdInputType,
  ): Promise<FindByUserIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findById.name,
        metadata: {
          findByUserIdInputData,
        },
      });

      const [user]: UserDocument[] = await this.basicService.find({
        schema: "User",
        filter: findByUserIdInputData.filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findById.name,
        metadata: {
          user,
        },
      });

      return findByUserIdOutputSchema.parse(user);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findById.name,
        error: error,
        findByUserIdInputData,
      });

      throw error;
    }
  }

  @Query({
    input: findByUserDataInputSchema,
    output: findByUserDataOutputSchema,
  })
  async findByData(
    @Input() findByUserDataInputData: FindByUserDataInputType,
  ): Promise<FindByUserDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.findByData.name,
        metadata: {
          findByUserDataInputData,
        },
      });

      const filter = query$or(findByUserDataInputData.filter);

      const users: UserDocument[] = await this.basicService.find({
        schema: "User",
        filter: filter,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.findByData.name,
        metadata: {
          users,
        },
      });

      return findByUserDataOutputSchema.parse(users);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.findByData.name,
        error: error,
        findByUserDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByUserIdInputSchema,
    output: updateByUserIdOutputSchema,
  })
  async updateById(
    @Input() updateByUserIdInputData: UpdateByUserIdInputType,
  ): Promise<UpdateByUserIdOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByUserIdInputData,
        },
      });

      const user = await this.basicService.findOneAndUpdate({
        schema: "User",
        filter: updateByUserIdInputData.filter,
        update: updateByUserIdInputData.update,
        select: [],
        populate: [],
      });

      this.logger.log({
        action: "Exit",
        method: this.updateById.name,
        metadata: {
          user,
        },
      });

      return updateByUserIdOutputSchema.parse(user);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByUserIdInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: updateByUserDataInputSchema,
    output: updateByUserDataOutputSchema,
  })
  async updateByData(
    @Input() updateByUserDataInputData: UpdateByUserDataInputType,
  ): Promise<UpdateByUserDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.updateById.name,
        metadata: {
          updateByUserDataInputData,
        },
      });

      const filter = query$or(updateByUserDataInputData.filter);

      const result = await this.basicService.updateMany({
        schema: "User",
        filter: filter,
        update: updateByUserDataInputData.update,
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

      return updateByUserDataOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.updateById.name,
        error: error,
        updateByUserDataInputData,
      });

      throw error;
    }
  }

  @Mutation({
    input: deleteByUserDataInputSchema,
    output: deleteByUserDataOutputSchema,
  })
  async deleteByData(
    @Input() deleteByUserDataInputData: DeleteByUserDataInputType,
  ): Promise<DeleteByUserDataOutputType> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.deleteByData.name,
        metadata: {
          deleteByUserDataInputData,
        },
      });

      const filter = query$or(deleteByUserDataInputData.filter);

      const result: DeleteResult = await this.basicService.delete({
        schema: "User",
        filter: filter,
      });

      this.logger.log({
        action: "Exit",
        method: this.deleteByData.name,
        metadata: {
          result,
        },
      });

      return deleteByUserDataOutputSchema.parse(result);
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.deleteByData.name,
        error: error,
        deleteByUserDataInputData,
      });

      throw error;
    }
  }
}
