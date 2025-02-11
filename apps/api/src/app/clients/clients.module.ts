import { Module } from "@nestjs/common";
import { ClientsService } from "@/app/clients/clients.service";
import { ClientsController } from "@/app/clients/clients.controller";

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
