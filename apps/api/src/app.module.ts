import { Module } from "@nestjs/common";
import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { ClientsModule } from "@/app/clients/clients.module";
import { OrganizationsModule } from "@/app/organizations/organizations.module";
import { DevicesModule } from "@/app/devices/devices.module";
import { SessionsModule } from "@/app/sessions/sessions.module";
import { ClientelesModule } from "@/app/clienteles/clienteles.module";
import { FormsModule } from "@/app/forms/forms.module";
import { TemplatesModule } from "@/app/email/templates/templates.module";
import { AgentsModule } from "@/app/email/agents/agents.module";
import { KeysModule } from "@/app/keys/keys.module";
import { ConfigModule } from "@nestjs/config";
import { envConfig } from "@/env/env.config";
import { EnvModule } from "@/env/env.module";
import { MongooseModelsModule } from "@/database/mongo/mongoose-models.module";
import { MongooseDatabaseModule } from "@/database/mongo/database.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validate: envConfig,
      expandVariables: true,
    }),
    EnvModule,
    ClientsModule,
    OrganizationsModule,
    DevicesModule,
    SessionsModule,
    ClientelesModule,
    FormsModule,
    TemplatesModule,
    AgentsModule,
    KeysModule,
    MongooseModelsModule,
    MongooseDatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
