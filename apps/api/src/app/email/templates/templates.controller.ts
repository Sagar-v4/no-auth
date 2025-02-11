import { Controller } from "@nestjs/common";
import { TemplatesService } from "@/app/email/templates/templates.service";

@Controller("templates")
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}
}
