import { ApiProperty } from '@nestjs/swagger';
import {
  propsPrimaryKey,
  propsUserEmail,
  propsUserGender,
  propsUserName,
  propsUserPhone,
} from 'src/shared/constants/swagger/api-property/user';
import { GenderEnum } from 'src/shared/enum/gender';
import { User } from '../user.entity';

export class UserDTO {
  @ApiProperty(propsPrimaryKey)
  readonly id: number;

  @ApiProperty(propsUserName)
  readonly name: string;

  @ApiProperty(propsUserEmail)
  readonly email: string;

  @ApiProperty(propsUserPhone)
  readonly phone: string;

  @ApiProperty(propsUserGender)
  readonly gender: GenderEnum | string | number;

  readonly onlineStatus: string;

  @ApiProperty()
  readonly firstCreated: Date;

  @ApiProperty()
  readonly lastModified: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.onlineStatus = user.onlineStatus;
    this.gender = user.gender ? Number(user.gender) : null;
    this.lastModified = user.lastModified;
    this.firstCreated = user.firstCreated;
  }
}
