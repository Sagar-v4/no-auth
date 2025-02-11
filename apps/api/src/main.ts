import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import { INestApplication, Logger } from "@nestjs/common";
import { EnvService } from "@/env/env.service";

async function bootstrap() {
  const logger: Logger = new Logger("Main");

  const app: INestApplication<any> = await NestFactory.create(AppModule);
  const configService: EnvService = app.get(EnvService);

  const PORT: number = configService.get("PORT");
  const NODE_ENV: string = configService.get("NODE_ENV");
  await app.listen(PORT);

  logger.debug(
    `\nPORT: ${PORT}\nNODE_ENV: ${NODE_ENV}\nURL: ${await app.getUrl()}\n`,
  );
}

bootstrap();
