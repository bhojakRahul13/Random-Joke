import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config, validateEnvironmentVariables } from './config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './entities/user/user.module';
import { JwtStrategy, StaticAuthGuard } from './shared/guards/auth.guard';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JokeModule } from './entities/jokes/joke.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config().JSON_WEB_TOKEN_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    ConfigModule.forRoot({
      load: [config],
      validate: validateEnvironmentVariables,
    }),
    PassportModule,
    DatabaseModule,
    SharedModule,
    UserModule,
    JokeModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, StaticAuthGuard],
})
export class AppModule {}
