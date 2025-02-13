import { Controller } from "@nestjs/common";
import { EmailTemplatesService } from "@/app/email/templates/templates.service";

@Controller("templates")
export class EmailTemplatesController {
  constructor(private readonly EmailTemplatesService: EmailTemplatesService) {}
}
