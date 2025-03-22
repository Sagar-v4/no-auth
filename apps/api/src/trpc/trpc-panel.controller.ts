import {
  All,
  Controller,
  Inject,
  Logger,
  OnModuleInit,
  Response,
} from "@nestjs/common";
import { AnyTRPCRouter } from "@trpc/server";
import { AppRouterHost } from "nestjs-trpc";
import { renderTrpcPanel } from "trpc-ui";
import { EnvService } from "@/env/env.service";
import { FastifyReply } from "fastify";
import { ApiExcludeController } from "@nestjs/swagger";

@Controller()
@ApiExcludeController()
export class TrpcPanelController implements OnModuleInit {
  private appRouter!: AnyTRPCRouter;
  private logger: Logger = new Logger(TrpcPanelController.name);

  constructor(
    @Inject(AppRouterHost) private readonly appRouterHost: AppRouterHost,
    private readonly envService: EnvService,
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

  onModuleInit() {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.onModuleInit.name,
      });

      this.appRouter = this.appRouterHost.appRouter as unknown as AnyTRPCRouter;

      this.logger.log({
        action: "Exit",
        method: this.onModuleInit.name,
      });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.onModuleInit.name,
        error: error,
      });

      throw new Error("Module Init Failure!");
    }
  }

  @All("/trpc-ui")
  panel(@Response() res: FastifyReply) {
    try {
      this.logger.debug({
        action: "Entry",
        method: this.panel.name,
      });

      const PORT = this.envService.get("PORT");
      res.type("text/html").send(
        renderTrpcPanel(this.appRouter, {
          url: `http://localhost:${PORT}/trpc`,
          cache: true,
          // meta: {
          //   title: "NO AUTH TRPC UI",
          //   description: "A UI for interacting with your TRPC server",
          // }
        }),
      );

      this.logger.log({
        action: "Exit",
        method: this.panel.name,
      });
    } catch (error) {
      this.logger.error({
        action: "Exit",
        method: this.panel.name,
        error: error,
      });

      throw new Error("Module Init Failure!");
    }
  }
}
