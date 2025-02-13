import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { FormsService } from "@/app/forms/forms.service";
import { FormsController } from "@/app/forms/forms.controller";
import { MONGOOSE_DB_CONNECTION } from "@/database/connections";
import { FORM_SCHEMA_NAME, FormSchema } from "@/app/forms/entities/form.entity";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: FORM_SCHEMA_NAME, schema: FormSchema }],
      MONGOOSE_DB_CONNECTION.FORM,
    ),
  ],
  controllers: [FormsController],
  providers: [FormsService],
  exports: [FormsService],
})
export class FormsModule {}
