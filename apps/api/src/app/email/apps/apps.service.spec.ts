import { Test, TestingModule } from "@nestjs/testing";
import { EmailAppsService } from "@/app/email/apps/apps.service";

describe("EmailAppsService", () => {
  let service: EmailAppsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailAppsService],
    }).compile();

    service = module.get<EmailAppsService>(EmailAppsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
