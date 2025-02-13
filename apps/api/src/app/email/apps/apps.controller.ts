import { Controller } from "@nestjs/common";
import { EmailAppsService } from "@/app/email/apps/apps.service";

@Controller("apps")
export class EmailAppsController {
  constructor(private readonly emailAppsService: EmailAppsService) {}
}
