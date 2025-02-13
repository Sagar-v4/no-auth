import { Test, TestingModule } from "@nestjs/testing";
import { EmailServicesService } from "@/app/email/services/services.service";

describe("EmailServicesService", () => {
  let service: EmailServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailServicesService],
    }).compile();

    service = module.get<EmailServicesService>(EmailServicesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
