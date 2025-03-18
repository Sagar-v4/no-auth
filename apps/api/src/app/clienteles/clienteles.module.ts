import { Module } from "@nestjs/common";

import { ClientelesService } from "@/app/clienteles/clienteles.service";
import { ClientelesController } from "@/app/clienteles/clienteles.controller";
import { ClientelesRouter } from "@/app/clienteles/clienteles.router";
import { BasicModule } from "@/app/basic/basic.module";

@Module({
  imports: [BasicModule],
  controllers: [ClientelesController],
  providers: [ClientelesService, ClientelesRouter],
  exports: [ClientelesService],
})
export class ClientelesModule {}
