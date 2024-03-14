import { UserLoginResponseDTO } from 'src/entities/user/dto/login-dto/login-response.dto';
import { UserRegisterResponseDTO } from 'src/entities/user/dto/register-dto/register-response.dto';
import { UserLogoutResponseDTO } from 'src/entities/user/dto/user-logout-dto/user-logout-response.dto';

export const UserLoginResponse = {
  description: 'User Login API',
  type: UserLoginResponseDTO,
};

export const UserRegisterResponse = {
description: 'User Register API',
type: UserRegisterResponseDTO,
};

export const userLogoutResponse = {
  description: 'User Logout Api',
  type: UserLogoutResponseDTO,
};

