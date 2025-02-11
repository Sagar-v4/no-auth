import { Test, TestingModule } from "@nestjs/testing";
import { ClientelesController } from "@/app/clienteles/clienteles.controller";
import { ClientelesService } from "@/app/clienteles/clienteles.service";

describe("ClientelesController", () => {
  let controller: ClientelesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientelesController],
      providers: [ClientelesService],
    }).compile();

    controller = module.get<ClientelesController>(ClientelesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
