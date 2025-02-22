import { Module } from "@nestjs/common";
import { TRPCModule } from "nestjs-trpc";

import { AppContext } from "@/trpc/context/app.context";
import { TrpcPanelController } from "@/trpc/trpc-panel.controller";
import { LoggerMiddleware } from "@/trpc/middleware/logger.midleware";

@Module({
  imports: [
    TRPCModule.forRoot({
      // context: AppContext,
      autoSchemaFile: "src/trpc/@generated",
    }),
  ],
  controllers: [TrpcPanelController],
  providers: [LoggerMiddleware, AppContext],
})
export class TrpcModule {}
