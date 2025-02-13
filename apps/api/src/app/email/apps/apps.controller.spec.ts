import { Test, TestingModule } from "@nestjs/testing";
import { EmailAppsController } from "@/app/email/apps/apps.controller";
import { EmailAppsService } from "@/app/email/apps/apps.service";

describe("EmailAppsController", () => {
  let controller: EmailAppsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailAppsController],
      providers: [EmailAppsService],
    }).compile();

    controller = module.get<EmailAppsController>(EmailAppsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
