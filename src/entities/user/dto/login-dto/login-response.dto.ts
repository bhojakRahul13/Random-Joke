import { ApiProperty } from '@nestjs/swagger';
import { propsStatus, propsToken, propsUserLoginResponse } from 'src/shared/constants/swagger/api-property/user';
import { UserDTO } from '../user.dto';

export class UserLoginResponseDTO {
  @ApiProperty(propsToken)
  token: string;

  @ApiProperty(propsStatus)
  status: number;

  @ApiProperty(propsUserLoginResponse)
  data: UserDTO;

  @ApiProperty()
  message: string;

  constructor(status: number, user: UserDTO, token?: string, message?: string) {
    this.status = status;
    this.data = user;
    this.message = message;
    this.token = token;
  }
}
