import { Controller } from "@nestjs/common";
import { RolesService } from "@/app/roles/roles.service";

@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
}
