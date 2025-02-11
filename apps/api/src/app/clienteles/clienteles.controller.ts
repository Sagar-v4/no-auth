import { Controller } from "@nestjs/common";
import { ClientelesService } from "@/app/clienteles/clienteles.service";

@Controller("clienteles")
export class ClientelesController {
  constructor(private readonly clientelesService: ClientelesService) {}
}
