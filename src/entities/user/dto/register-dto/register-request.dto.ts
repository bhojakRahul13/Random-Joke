import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEnum, Matches, IsIn } from 'class-validator';
import { errorMessageInvalidEmail, errorUserNameInvalid, errorUserPasswordInvalid, errorUserPhoneInvalid } from 'src/shared/constants/errors/user';
import { regEmail, regPassword, regPhone } from 'src/shared/constants/helpers/regex';
import { propsUserEmail, propsUserGender, propsUserName, propsUserPassword, propsUserPhone } from 'src/shared/constants/swagger/api-property/user';

export class RegisterUserRequest {

  @ApiProperty(propsUserName)
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z ]{5,}$/, {
    message: errorUserNameInvalid
  })
  readonly name: string;

  @ApiProperty(propsUserEmail)
  @IsNotEmpty()
  @Matches(regEmail, {
    message: errorMessageInvalidEmail.message 
  })
  readonly email: string;

  
  @ApiProperty(propsUserPassword)
  @IsNotEmpty()
  @Matches(regPassword,{message:errorUserPasswordInvalid})
  readonly password: string;

  
  @ApiProperty(propsUserPhone)
  @IsOptional()
  @IsString()
  @Matches(regPhone,{
    message:errorUserPhoneInvalid
  })
  readonly phone: string;

  @ApiProperty(propsUserGender)
  @IsString()
  @IsOptional()
  @IsIn(['1', '2', '3'],{message:"Gender must be one of the following values: 1 = male, 2 = female, 3 = otherr"})
  readonly gender: string;
}
