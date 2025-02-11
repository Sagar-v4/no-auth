import { Controller } from "@nestjs/common";
import { KeysService } from "@/app/keys/keys.service";

@Controller("keys")
export class KeysController {
  constructor(private readonly keysService: KeysService) {}
}
