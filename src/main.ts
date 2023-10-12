import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import connectToDb from './database';

async function main() {
  const logger = new Logger(main.name);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  connectToDb();

  const config = new DocumentBuilder()
    .setTitle('Nest_Project api documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3333, () => {
    logger.log('Server is running on http://localhost:3333');
    logger.log('Swagger is running on http://localhost:3333/api');
  });
}
main();
