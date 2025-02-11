import { Test, TestingModule } from "@nestjs/testing";
import { KeysService } from "@/app/keys/keys.service";

describe("KeysService", () => {
  let service: KeysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeysService],
    }).compile();

    service = module.get<KeysService>(KeysService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
