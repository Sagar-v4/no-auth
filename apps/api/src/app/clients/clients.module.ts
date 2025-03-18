import { Module } from "@nestjs/common";

import { ClientsService } from "@/app/clients/clients.service";
import { ClientsController } from "@/app/clients/clients.controller";
import { ClientsRouter } from "@/app/clients/clients.router";
import { BasicModule } from "@/app/basic/basic.module";

@Module({
  imports: [BasicModule],
  controllers: [ClientsController],
  providers: [ClientsRouter, ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
