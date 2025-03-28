import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SwaggerUI } from "@/swagger/swagger-ui.class";
import { _SWAGGER_TAGS } from "@/swagger/swagger-tags/swagger-tags.constants";
import { EnvService } from "@/env/env.service";

export class SwaggerDocumentBuilder {
  constructor(private readonly app: INestApplication<any>) {}

  private buildConfig() {
    const docBuilder = new DocumentBuilder();
    // .setTitle("NO AUTH SWAGGER UI")
    // .setDescription("A UI for interacting with your API server")
    // .setVersion("1.0")
    // .addBasicAuth()
    // .addBearerAuth(
    //   {
    //     bearerFormat: "Bearer",
    //     scheme: "Bearer",
    //     type: "http",
    //     in: "Header",
    //   },
    //   "JWTAuthorization"
    // );

    _SWAGGER_TAGS.forEach((tag) => {
      docBuilder.addTag(tag.name, tag.description);
    });

    return docBuilder.build();
  }

  private createDocument() {
    const config = this.buildConfig();
    return SwaggerModule.createDocument(this.app, config, {
      deepScanRoutes: true,
    });
  }

  public setupSwagger(envService: EnvService) {
    const document = this.createDocument();

    const swaggerUI = new SwaggerUI(envService);
    SwaggerModule.setup(
      "swagger-ui",
      this.app,
      document,
      swaggerUI.customOptions,
    );
  }
}
