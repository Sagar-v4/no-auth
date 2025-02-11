import { Module } from "@nestjs/common";
import { ClientelesService } from "@/app/clienteles/clienteles.service";
import { ClientelesController } from "@/app/clienteles/clienteles.controller";

@Module({
  controllers: [ClientelesController],
  providers: [ClientelesService],
})
export class ClientelesModule {}
