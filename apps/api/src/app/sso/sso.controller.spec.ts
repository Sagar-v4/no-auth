import { Test, TestingModule } from "@nestjs/testing";
import { SSOController } from "@/app/sso/sso.controller";
import { SSOService } from "@/app/sso/sso.service";

describe("SSOController", () => {
  let controller: SSOController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SSOController],
      providers: [SSOService],
    }).compile();

    controller = module.get<SSOController>(SSOController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
