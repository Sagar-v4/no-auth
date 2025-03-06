import {
  All,
  Controller,
  Inject,
  OnModuleInit,
  Response,
} from "@nestjs/common";
import { AnyRouter } from "@trpc/server";
import { AppRouterHost } from "nestjs-trpc";
import { renderTrpcPanel } from "trpc-panel";
import { EnvService } from "@/env/env.service";
import { FastifyReply } from "fastify";

@Controller()
export class TrpcPanelController implements OnModuleInit {
  private appRouter!: AnyRouter;

  constructor(
    @Inject(AppRouterHost) private readonly appRouterHost: AppRouterHost,
    private readonly envService: EnvService,
  ) {}

  onModuleInit() {
    this.appRouter = this.appRouterHost.appRouter;
  }

  @All("/trpc-panel")
  panel(@Response() res: FastifyReply) {
    const PORT = this.envService.get("PORT");
    res.type("text/html").send(
      renderTrpcPanel(this.appRouter, {
        url: `http://localhost:${PORT}/trpc`,
        cache: true,
      }),
    );
  }
}
