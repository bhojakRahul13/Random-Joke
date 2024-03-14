import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import basicAuth from 'express-basic-auth';
import { config as configBase } from './config';
import { config } from 'dotenv';
import { setupSwagger } from './swagger';
import { useContainer } from 'class-validator';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use(
    '/documentation',
    basicAuth({
      users: { admin: configBase().SWAGGER_PASSWORD },
      challenge: true,
    }),
  );
  await setupSwagger(app);
  await app.listen(Number(configBase().PORT), () => {
    console.log('listening started on port:' + Number(configBase().PORT));
  });
}
bootstrap();
