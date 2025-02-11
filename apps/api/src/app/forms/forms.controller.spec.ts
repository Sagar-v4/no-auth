import { Test, TestingModule } from "@nestjs/testing";
import { FormsController } from "@/app/forms/forms.controller";
import { FormsService } from "@/app/forms/forms.service";

describe("FormsController", () => {
  let controller: FormsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormsController],
      providers: [FormsService],
    }).compile();

    controller = module.get<FormsController>(FormsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
