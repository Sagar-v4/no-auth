import { Test, TestingModule } from "@nestjs/testing";
import { ClientsService } from "@/app/clients/clients.service";

describe("ClientsService", () => {
  let service: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
