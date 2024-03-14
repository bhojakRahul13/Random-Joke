import { ApiProperty} from '@nestjs/swagger';
import {
  IsNotEmpty,
} from 'class-validator';
import { customValidator } from 'src/shared/validate/validator';

export class UserLoginRequestDTO {

  @ApiProperty()
  @IsNotEmpty()
  @customValidator('password')
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;

}
