import { Controller } from "@nestjs/common";
import { ClientsService } from "@/app/clients/clients.service";

@Controller("clients")
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}
}
