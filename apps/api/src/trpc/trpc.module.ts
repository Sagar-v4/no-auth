import { Module } from "@nestjs/common";
import { TRPCModule } from "nestjs-trpc";

import { AppContext } from "./context/app.context";
import { TrpcPanelController } from "@/trpc/trpc-panel.controller";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";
import { EnvModule } from "@/env/env.module";

@Module({
  imports: [
    TRPCModule.forRoot({
      basePath: "/trpc",
      context: AppContext,
      // autoSchemaFile: undefined, // No File Generated
      autoSchemaFile: "../../libs/trpc/@generated",
    }),
    EnvModule,
  ],
  controllers: [TrpcPanelController],
  providers: [LoggerMiddleware, AppContext],
})
export class TrpcModule {}
