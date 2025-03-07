import { Test, TestingModule } from "@nestjs/testing";
import { PermissionGroupsController } from "@/app/permission-groups/permission-groups.controller";
import { PermissionGroupsService } from "@/app/permission-groups/permission-groups.service";

describe("PermissionGroupsController", () => {
  let controller: PermissionGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionGroupsController],
      providers: [PermissionGroupsService],
    }).compile();

    controller = module.get<PermissionGroupsController>(
      PermissionGroupsController,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
