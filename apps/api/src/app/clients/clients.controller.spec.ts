import { Test, TestingModule } from "@nestjs/testing";
import { ClientsController } from "@/app/clients/clients.controller";
import { ClientsService } from "@/app/clients/clients.service";

describe("ClientsController", () => {
  let controller: ClientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [ClientsService],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
