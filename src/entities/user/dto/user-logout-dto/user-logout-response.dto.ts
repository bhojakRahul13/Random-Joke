import { ApiProperty } from '@nestjs/swagger';
import { propsUserLogoutResponse } from 'src/shared/constants/swagger/api-property/user';

export class UserLogoutResponseDTO {
  status: number;

  @ApiProperty(propsUserLogoutResponse)
  data: object;

  @ApiProperty()
  message: string;

  constructor(status: number, user: object, message?: string) {
    this.status = status;
    this.data = user;
    this.message = message;
  }
}
