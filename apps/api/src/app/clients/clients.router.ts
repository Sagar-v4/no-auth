import { z } from "zod";
import { Logger } from "@nestjs/common";
import { Input, Mutation, Query, Router, UseMiddlewares } from "nestjs-trpc";

import { ClientsService } from "@/app/clients/clients.service";
import { ClientDocument } from "@/app/clients/entities/client.entity";
import {
  ClientSchema,
  clientSchema,
  CreateClientSchema,
  createClientSchema,
} from "../clients/schemas/client.schema";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";

@Router({
  alias: "clients",
})
// @UseMiddlewares(LoggerMiddleware)
export class ClientsRouter {
  private logger: Logger = new Logger(ClientsRouter.name);

  constructor(private readonly clientsService: ClientsService) {
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
    input: createClientSchema,
    output: z.any(clientSchema),
  })
  async createClient(
    @Input() clientSchema: ClientSchema,
  ): Promise<ClientSchema> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.createClient.name,
        metadata: {
          clientSchema,
        },
      });

      const client: ClientDocument = await this.clientsService.insertOne({
        ...clientSchema,
        metadata: {},
      });

      this.logger.log({
        action: "Exit",
        method: this.createClient.name,
        metadata: {
          client,
        },
      });

      return client as any;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.createClient.name,
        error: error,
      });

      throw new Error("Failed to create client");
    }
  }

  @Query({
    input: z.object({
      id: z.string(),
    }),
    output: z.any(clientSchema),
  })
  async getClient(@Input("id") id: string): Promise<ClientSchema> {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.getClient.name,
        metadata: {
          id,
        },
      });

      const client: ClientDocument = await this.clientsService.findOne({
        filter: {
          _id: id,
        },
        projection: {},
      });

      this.logger.log({
        action: "Exit",
        method: this.getClient.name,
        metadata: {
          client,
        },
      });

      return client as any;
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.getClient.name,
        error: error,
      });

      throw new Error("Failed to get client");
    }
  }
}
