import { Module } from "@nestjs/common";
import { TRPCModule } from "nestjs-trpc";

import { AppContext } from "@/trpc/context/app.context";
import { TrpcPanelController } from "@/trpc/trpc-panel.controller";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { EnvModule } from "@/env/env.module";

@Module({
  imports: [
    TRPCModule.forRoot({
      autoSchemaFile: "../../packages/trpc/src/@generated",
      basePath: "/trpc",
      context: AppContext,
    }),
    EnvModule,
  ],
  controllers: [TrpcPanelController],
  providers: [LoggerMiddleware, AppContext],
})
export class TrpcModule {}
