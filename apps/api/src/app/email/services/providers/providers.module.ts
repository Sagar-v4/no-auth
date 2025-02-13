import { Module } from "@nestjs/common";

import { EmailAppsModule } from "@/app/email/apps/apps.module";
import { EmailTemplatesModule } from "@/app/email/templates/templates.module";
import { OrganizationsModule } from "@/app/organizations/organizations.module";
import { NodeMailer } from "@/app/email/services/providers/node-mailer.service";
import { EmailServicesProvidersService } from "@/app/email/services/providers/providers.service";

@Module({
  imports: [EmailAppsModule, EmailTemplatesModule, OrganizationsModule],
  providers: [EmailServicesProvidersService, NodeMailer],
  exports: [EmailServicesProvidersService, NodeMailer],
})
export class EmailServicesProvidersModule {}
