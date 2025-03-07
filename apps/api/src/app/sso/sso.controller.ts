import { Controller } from "@nestjs/common";
import { SSOService } from "@/app/sso/sso.service";

@Controller("sso")
export class SSOController {
  constructor(private readonly ssoService: SSOService) {}
}
