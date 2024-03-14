import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RandomJokeResponseDTO } from './dto/getRandonJoke/random-joke-response.dto';
import { JokeSuccessMessage } from 'src/shared/constants/helpers/message';

@Injectable()
export class JokeService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  /**
   * * Retrieving joke Function
   * ? This API is used for Retrieving random Joke purpose
   */
  getRandomJoke = async () => {
    try {
      const response = await this.httpService.axiosRef.get(
        'https://api.chucknorris.io/jokes/random',
      );
      
      if (response && response.data && response.data.value) {
        const data = response.data.value;
        return new RandomJokeResponseDTO(HttpStatus.OK, data, JokeSuccessMessage);
      } else {
        throw new Error('Invalid response from API');
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
