import { Controller } from "@nestjs/common";
import { PermissionGroupsService } from "@/app/permission-groups/permission-groups.service";

@Controller("permission-groups")
export class PermissionGroupsController {
  constructor(
    private readonly permissionGroupsService: PermissionGroupsService,
  ) {}
}
