import { Module } from "@nestjs/common";
import { FormsService } from "@/app/forms/forms.service";
import { FormsController } from "@/app/forms/forms.controller";

@Module({
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
