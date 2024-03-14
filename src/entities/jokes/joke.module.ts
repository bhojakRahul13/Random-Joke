import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { JokeController } from './joke.controller';
import { JokeService } from './joke.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [SharedModule, HttpModule],
  providers: [JokeService],
  controllers: [JokeController],
})
export class JokeModule {}
