import { Module } from "@nestjs/common";

import { NodeMailer } from "@/app/email/services/providers/node-mailer.service";

@Module({
  providers: [NodeMailer],
  exports: [NodeMailer],
})
export class EmailServicesProvidersModule {}
