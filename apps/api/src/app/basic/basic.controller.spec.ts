import { Test, TestingModule } from "@nestjs/testing";
import { BasicController } from "@/app/basic/basic.controller";
import { BasicService } from "@/app/basic/basic.service";

describe("BasicController", () => {
  let controller: BasicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasicController],
      providers: [BasicService],
    }).compile();

    controller = module.get<BasicController>(BasicController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
