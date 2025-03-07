import { Test, TestingModule } from "@nestjs/testing";
import { SSOService } from "@/app/sso/sso.service";

describe("SSOService", () => {
  let service: SSOService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SSOService],
    }).compile();

    service = module.get<SSOService>(SSOService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
