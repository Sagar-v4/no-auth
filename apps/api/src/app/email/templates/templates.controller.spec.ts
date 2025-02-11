import { Test, TestingModule } from "@nestjs/testing";
import { TemplatesController } from "@/app/email/templates/templates.controller";
import { TemplatesService } from "@/app/email/templates/templates.service";

describe("TemplatesController", () => {
  let controller: TemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplatesController],
      providers: [TemplatesService],
    }).compile();

    controller = module.get<TemplatesController>(TemplatesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
