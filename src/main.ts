import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MyValidationPipe } from './pipes/MyValidationPipe';
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("BookStore app by Islam, Danyal & Nazym")
    .setDescription("Documentation for REST API v1")
    .setVersion("1.0.0")
    .addTag("BookStore")
    .build();
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  const documentation = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/docs", app, documentation)

  await app.listen(8080);
  app.enableCors(
    // {
    //   origin: '*',
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    //   // credentials: true,
    // }
  )
  app.useGlobalPipes(new MyValidationPipe());
  app.setGlobalPrefix("api/v1");

}
bootstrap();
