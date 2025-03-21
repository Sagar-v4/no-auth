import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import { Logger, VersioningType } from "@nestjs/common";
import { EnvService } from "@/env/env.service";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { patchNestJsSwagger } from "nestjs-zod";

const globalPrefix = "api";

async function bootstrap() {
  const logger: Logger = new Logger("Main");

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const envService: EnvService = app.get(EnvService);
  const PORT = envService.get("PORT");
  const NODE_ENV = envService.get("NODE_ENV");

  const swaggerConfig = new DocumentBuilder()
    // .setTitle("NO AUTH SWAGGER UI")
    // .setDescription("A UI for interacting with your API server")
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig, {
      deepScanRoutes: true,
    });
  patchNestJsSwagger();
  SwaggerModule.setup("swagger-ui", app, documentFactory, {
    useGlobalPrefix: true,
    explorer: true,
    ui: NODE_ENV !== "production",
    jsonDocumentUrl: "swagger-json",
    customSiteTitle: "No Auth API",
    customCss: `.swagger-ui .information-container { display: none; }`,
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(PORT);

  logger.debug(
    `\nPORT: ${PORT}\nNODE_ENV: ${NODE_ENV}\nURL: ${await app.getUrl()}\n`,
  );
}

bootstrap();
