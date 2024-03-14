import { ApiProperty } from '@nestjs/swagger';

export class RandomJokeResponseDTO {

  @ApiProperty()
  status: number;

  @ApiProperty()
  data: any;

  @ApiProperty()
  message: string;

  constructor(status: number, user: any, message?: string) {
    this.status = status;
    this.data = user;
    this.message = message;
  }
}
