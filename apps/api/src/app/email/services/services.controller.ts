import { Controller } from "@nestjs/common";
import { EmailServicesService } from "@/app/email/services/services.service";

@Controller("services")
export class EmailServicesController {
  constructor(private readonly emailServicesService: EmailServicesService) {}
}
