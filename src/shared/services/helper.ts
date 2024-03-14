import {  Injectable } from '@nestjs/common';
import { regEmail, regPassword, regPhone } from '../constants/helpers/regex';

@Injectable()
export class HelperService {
  
  async emailValidate(email: string): Promise<boolean> {
    
    if (email.match(regEmail) == null) {
      return false;
    }
    return true;
  }

  async phoneValidate(phone: string): Promise<boolean> {

    if (phone.match(regPhone) == null) {
      return false;
    }
    return true;
  }

  async passwordValidate(password: string): Promise<boolean> {
    if (password.match(regPassword) == null) {
      return false;
    }
    return true;
  }

  /** Get the Login Types */
  getGenderType(value: string) {
    switch (value) {
      case '1':
        return 'Male';
      case '1':
        return 'Female';
      case '2':
        return 'Other';
      default:
        return 'Unknown';
    }
  }

}
