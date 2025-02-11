import { Test, TestingModule } from "@nestjs/testing";
import { ClientelesService } from "@/app/clienteles/clienteles.service";

describe("ClientelesService", () => {
  let service: ClientelesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientelesService],
    }).compile();

    service = module.get<ClientelesService>(ClientelesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
