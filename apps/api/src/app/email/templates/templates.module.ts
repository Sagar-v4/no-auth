import { Module } from "@nestjs/common";
import { TemplatesService } from "@/app/email/templates/templates.service";
import { TemplatesController } from "@/app/email/templates/templates.controller";

@Module({
  controllers: [TemplatesController],
  providers: [TemplatesService],
})
export class TemplatesModule {}
