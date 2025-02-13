import { Module } from "@nestjs/common";

import { EmailTemplatesService } from "@/app/email/templates/templates.service";
import { EmailTemplatesController } from "@/app/email/templates/templates.controller";

@Module({
  controllers: [EmailTemplatesController],
  providers: [EmailTemplatesService],
  exports: [EmailTemplatesService],
})
export class EmailTemplatesModule {}
