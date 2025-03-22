import { Logger } from "@nestjs/common";
import { DeleteResult, InsertManyResult } from "mongoose";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { UsersV1Service } from "@/app/users/services/users.v1.service";
import { UserDocument } from "@/app/users/entities/user.entity";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import {
  insertOneUserInput,
  InsertOneUserInput,
  insertOneUserOutput,
  InsertOneUserOutput,
  insertManyUserInput,
  InsertManyUserInput,
  insertManyUserOutput,
  InsertManyUserOutput,
  findByUserIdInput,
  FindByUserIdInput,
  findByUserIdOutput,
  FindByUserIdOutput,
  findByUserDataInput,
  FindByUserDataInput,
  findByUserDataOutput,
  FindByUserDataOutput,
  updateByUserIdInput,
  UpdateByUserIdInput,
  updateByUserIdOutput,
  UpdateByUserIdOutput,
  updateByUserDataInput,
  UpdateByUserDataInput,
  updateByUserDataOutput,
  UpdateByUserDataOutput,
  deleteByUserDataInput,
  DeleteByUserDataInput,
  deleteByUserDataOutput,
  DeleteByUserDataOutput,
} from "../../../../../../libs/trpc/schemas/v1/users";
import { query$or } from "@/utils/query-builder";
import { BasicService } from "@/app/basic/basic.service";

@Router({
  alias: "usersV1",
})
@UseMiddlewares(LoggerMiddleware)
export class UsersV1Router {
  private logger: Logger = new Logger(UsersV1Router.name);

  constructor(
    private readonly usersService: UsersV1Service,
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
    input: insertOneUserInput,
    output: insertOneUserOutput,
  })
  async insertOne(
    @Input() insertOneUserInputData: InsertOneUserInput,
  ): Promise<InsertOneUserOutput> {
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

      return insertOneUserOutput.parse(user);
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
    input: insertManyUserInput,
    output: insertManyUserOutput,
  })
  async insertMany(
    @Input() insertManyUserInputData: InsertManyUserInput,
  ): Promise<InsertManyUserOutput> {
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

      return insertManyUserOutput.parse(result);
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
    input: findByUserIdInput,
    output: findByUserIdOutput,
  })
  async findById(
    @Input() findByUserIdInputData: FindByUserIdInput,
  ): Promise<FindByUserIdOutput> {
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

      return findByUserIdOutput.parse(user);
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
    input: findByUserDataInput,
    output: findByUserDataOutput,
  })
  async findByData(
    @Input() findByUserDataInputData: FindByUserDataInput,
  ): Promise<FindByUserDataOutput> {
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

      return findByUserDataOutput.parse(users);
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
    input: updateByUserIdInput,
    output: updateByUserIdOutput,
  })
  async updateById(
    @Input() updateByUserIdInputData: UpdateByUserIdInput,
  ): Promise<UpdateByUserIdOutput> {
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

      return updateByUserIdOutput.parse(user);
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
    input: updateByUserDataInput,
    output: updateByUserDataOutput,
  })
  async updateByData(
    @Input() updateByUserDataInputData: UpdateByUserDataInput,
  ): Promise<UpdateByUserDataOutput> {
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

      return updateByUserDataOutput.parse(result);
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
    input: deleteByUserDataInput,
    output: deleteByUserDataOutput,
  })
  async deleteByData(
    @Input() deleteByUserDataInputData: DeleteByUserDataInput,
  ): Promise<DeleteByUserDataOutput> {
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

      return deleteByUserDataOutput.parse(result);
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
