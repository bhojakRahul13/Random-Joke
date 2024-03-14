import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../../entities/user/user.service';
import bcrypt from 'bcrypt';
import { regEmail } from '../constants/helpers/regex';
import { emailInUseError, errorMessageInvalidEmail } from '../constants/errors/user';

@ValidatorConstraint({ name: 'customValidator', async: true })
@Injectable()
export class IsEmailExistOrPasswordMatchConstraint
  implements ValidatorConstraintInterface
{
  constructor(protected readonly userService: UserService) {}
  async validate(value: string, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as object)[relatedPropertyName];

    if (value == undefined || value == '') {
      return false;
    }

    const userCheck = await this.userService.userExist(value);

    if (userCheck && relatedValue) {
      const passwordMatch = await bcrypt.compare(
        relatedValue,
        userCheck.password,
      );

      if (passwordMatch == false) {
        return false;
      } else {
        return true;
      }
    } else if (userCheck == null && relatedValue) {
      return false;
    } else if (userCheck) {
      return false;
    } else {
      return true;
    }
  }
  defaultMessage(args: ValidationArguments) {
    if (args.value == undefined || args.value.match(regEmail) == null) {
      return errorMessageInvalidEmail.message;
    }

    if (args.constraints[0] != undefined) {
      return 'Incorrect email/password';
    }

    return emailInUseError.message;
  }
}
