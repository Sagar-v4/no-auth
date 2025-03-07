import { Controller } from "@nestjs/common";
import { PermissionsService } from "@/app/permissions/permissions.service";

@Controller("permissions")
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}
}
