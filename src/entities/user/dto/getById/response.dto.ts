import { ApiProperty } from '@nestjs/swagger';
import { propsUserLoginResponse } from 'src/shared/constants/swagger/api-property/user';
import { UserDTO } from '../user.dto';

export class UserProfileResponseDTO {

  @ApiProperty()
  status: number;

  @ApiProperty(propsUserLoginResponse)
  data: UserDTO;

  @ApiProperty()
  message: string;

  constructor(status: number, user: UserDTO, message?: string) {
    this.status = status;
    this.data = user;
    this.message = message;
  }
}
