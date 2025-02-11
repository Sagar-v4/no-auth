import { Test, TestingModule } from "@nestjs/testing";
import { AgentsController } from "@/app/email/agents/agents.controller";
import { AgentsService } from "@/app/email/agents/agents.service";

describe("AgentsController", () => {
  let controller: AgentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentsController],
      providers: [AgentsService],
    }).compile();

    controller = module.get<AgentsController>(AgentsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
