import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export async function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Random Joke  Example API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document);
}
