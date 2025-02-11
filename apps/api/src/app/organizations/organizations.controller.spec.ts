import { Test, TestingModule } from "@nestjs/testing";
import { OrganizationsController } from "@/app/organizations/organizations.controller";
import { OrganizationsService } from "@/app/organizations/organizations.service";

describe("OrganizationsController", () => {
  let controller: OrganizationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationsController],
      providers: [OrganizationsService],
    }).compile();

    controller = module.get<OrganizationsController>(OrganizationsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
