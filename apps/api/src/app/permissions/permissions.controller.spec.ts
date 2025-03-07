import { Test, TestingModule } from "@nestjs/testing";
import { PermissionsController } from "@/app/permissions/permissions.controller";
import { PermissionsService } from "@/app/permissions/permissions.service";

describe("PermissionsController", () => {
  let controller: PermissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsController],
      providers: [PermissionsService],
    }).compile();

    controller = module.get<PermissionsController>(PermissionsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
