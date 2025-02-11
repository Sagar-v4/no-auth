import { Controller } from "@nestjs/common";
import { FormsService } from "@/app/forms/forms.service";

@Controller("forms")
export class FormsController {
  constructor(private readonly formsService: FormsService) {}
}
