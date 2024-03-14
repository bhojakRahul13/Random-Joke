import {
  Controller,
  Get,
  HttpCode,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StaticAuthGuard } from 'src/shared/guards/auth.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt.auth';
import { AllExceptionsFilter } from 'src/shared/exception/HttpExceptionFilter';
import { JokeService } from './joke.service';

@ApiTags('Random-Joke')
@Controller('api/random-joke')
@UseFilters(AllExceptionsFilter)
export class JokeController {
  constructor(private readonly jokeService: JokeService) {}

  /**
   * --------------------------------------------------------------------------------
   * * Get Random Joke  API
   * ? This API is used for Get Random joke  purpose
   */
  @Get('/')
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard, StaticAuthGuard)
  @ApiOperation({ summary: 'Get Random joke API' })
  @HttpCode(200)
  public async getUserProfile() {
    return this.jokeService.getRandomJoke();
  }
}
