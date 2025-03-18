import { Controller } from "@nestjs/common";
import { BasicService } from "@/app/basic/basic.service";

@Controller("basic")
export class BasicController {
  constructor(private readonly basicService: BasicService) {}
}
