// import { ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config";
import {
  NestFactory,
  Reflector,
} from "@nestjs/core";
import {
  DocumentBuilder,
  SwaggerModule,
} from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { MessageComponent } from "./components/message.component";
import { RolesGuard } from "./validators/roles.guard";
import {
  ValidationPipe422,
} from "./validators/validation-pipe-tranform.validate";

async function bootstrap() {
    const app = await NestFactory.create(
        AppModule
    );

    MessageComponent.init();
    const configService = app.get(ConfigService);
    const port = String(configService.get("port") || 3000)

    const config = new DocumentBuilder()
        .setTitle("ASR Upload API")
        .setVersion("1.0")
        .addBearerAuth()
        .addServer(`http://localhost:${port}`)
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);
    app.useGlobalPipes(new ValidationPipe422())
    app.useGlobalGuards(new RolesGuard(new Reflector()))

    await app.listen(port, "0.0.0.0");

    console.log(`Application is running on: ${await app.getUrl()}`);
}

void bootstrap();
