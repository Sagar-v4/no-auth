import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import { Logger } from "@nestjs/common";
import { EnvService } from "@/env/env.service";
import {
  ExpressAdapter,
  NestExpressApplication,
} from "@nestjs/platform-express";

const globalPrefix = "api";

async function bootstrap() {
  const logger: Logger = new Logger("Main");

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );
  app.enableCors();
  // app.setGlobalPrefix(globalPrefix);

  const envService: EnvService = app.get(EnvService);
  const PORT: number = envService.get("PORT");
  const NODE_ENV: string = envService.get("NODE_ENV");
  await app.listen(PORT);

  logger.debug(
    `\nPORT: ${PORT}\nNODE_ENV: ${NODE_ENV}\nURL: ${await app.getUrl()}\n`,
  );
}

bootstrap();
