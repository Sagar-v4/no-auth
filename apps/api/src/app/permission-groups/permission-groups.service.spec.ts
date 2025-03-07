import { Test, TestingModule } from "@nestjs/testing";
import { PermissionGroupsService } from "@/app/permission-groups/permission-groups.service";

describe("PermissionGroupsService", () => {
  let service: PermissionGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionGroupsService],
    }).compile();

    service = module.get<PermissionGroupsService>(PermissionGroupsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
