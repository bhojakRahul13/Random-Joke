import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Op, where } from 'sequelize';
import {
  errorEmailExist,
  errorPhoneExist,
} from 'src/shared/constants/errors/user';
import {
  UserDetailSuccessMessage,
  loginSuccessMessage,
  logoutMessage,
  registerSuccessMessage,
  successMessage,
} from 'src/shared/constants/helpers/message';
import { HelperService } from 'src/shared/services/helper';
import { UserLoginRequestDTO } from './dto/login-dto/login-request.dto';
import { UserDTO } from './dto/user.dto';
import { User } from './user.entity';
import { config } from 'src/config';
import { RegisterUserRequest } from './dto/register-dto/register-request.dto';
import * as bcrypt from 'bcrypt';
import { UserLoginResponseDTO } from './dto/login-dto/login-response.dto';
import { UserRegisterResponseDTO } from './dto/register-dto/register-response.dto';
import { UserProfileResponseDTO } from './dto/getById/response.dto';
import { HttpStatusCode } from 'axios';
import { UserLogoutResponseDTO } from './dto/user-logout-dto/user-logout-response.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: typeof User,
    private readonly helperService: HelperService,
    private readonly httpService: HttpService,
  ) {}

  /**
   * User registartion
   * @param reqData
   * @returns
   */
  registerUser = async (reqData: RegisterUserRequest) => {
    const findEmailExist = await this.userRepository.findOne<User>({
      where: {
        email: reqData.email,
      },
    });

    if (findEmailExist) {
      throw new HttpException(errorEmailExist, HttpStatus.FOUND);
    }

    const findPhoneExist = await this.userRepository.findOne<User>({
      where: {
        phone: reqData.phone,
      },
    });

    if (findPhoneExist) {
      throw new HttpException(errorPhoneExist, HttpStatus.FOUND);
    }

    const registerObj = {
      name: reqData.name ? reqData.name : reqData.name,
      email: reqData.email ? reqData.email : null,
      gender: reqData.gender ? reqData.gender : '1',
      password: bcrypt.hashSync(reqData.password, await bcrypt.genSalt()),
      phone: reqData.phone ? reqData.phone : null,
    };
    const createdUser = await this.userRepository.create<User>(registerObj);

    const token = sign(
      {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser?.email,
      },
      config().JSON_WEB_TOKEN_SECRET_KEY,
    );

    const userData = await this.userRepository.findOne<User>({
      where: { id: createdUser.id },
    });

    return new UserRegisterResponseDTO(
      HttpStatus.CREATED,
      new UserDTO(userData),
      'Bearer ' + token,
      registerSuccessMessage,
    );
  };

  /**
   * * Login Function
   * @param email:string
   * ? This API is used for Login purpose
   */
  login = async (reqData: UserLoginRequestDTO) => {
    try {
      const userData = await this.userRepository.findOne<User>({
        where: { email: reqData.email },
      });

      /** Update online status to true */

      await this.userRepository.update(
        { onlineStatus: '1' },
        {
          where: {
            id: userData.id,
          },
        },
      );
      const token = sign(
        {
          id: userData.id,
          name: userData.name,
          email: userData?.email,
        },
        config().JSON_WEB_TOKEN_SECRET_KEY,
      );

      return new UserLoginResponseDTO(
        HttpStatus.OK,
        new UserDTO(userData),
        'Bearer ' + token,
        loginSuccessMessage,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };



  /**
   * * Retrieving user  Function
   * ? This API is used for Retrieving User  purpose
   */
  getUserProfileDetail = async (user: User) => {
    try {
      const userData = await this.userRepository.findOne<User>({
        where: { id: user.id },
      });

      return new UserProfileResponseDTO(
        HttpStatus.OK,
        userData,
        UserDetailSuccessMessage,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  /**
   * * Retrieving user  by email Function
   * @param email:string,
   * ? This API is used for Retrieving user by email purpose
   */
  getUserByEmail = async (email: string): Promise<User> => {
    try {
      const userData = await this.userRepository.findOne<User>({
        where: { email: email },
      });

      if (userData == null) {
        return null;
      }

      return userData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };
  /**
   * * Check User Exist By Email Function
   * @param email:string,
   * ? This API is used for user exist API
   */
  userExist = async (email: string): Promise<User> => {
    const userData = await this.userRepository.findOne<User>({
      where: { email: email },
    });

    if (userData) {
      return userData;
    } else {
      return null;
    }
  };

  /**
   * * Retrieving user by phone Function
   * @param phone:string,
   * ? This API is used for Retrieving User by phone purpose
   */
  getUserByPhone = async (
    phone: string,
    type?: string,
    userId?: string,
  ): Promise<User> => {
    try {
      let whereQuery = {};

      if (typeof type != 'undefined' && type == 'update') {
        whereQuery = {
          where: { phone: phone, id: { [Op.ne]: userId } },
        };
      } else {
        whereQuery = {
          where: { phone: phone },
        };
      }

      const userData = await this.userRepository.findOne<User>(whereQuery);

      if (userData == null) {
        return null;
      }

      return userData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  /** Jwt purpose  */
  isValidateUser = async (userId: string | number) => {
    try {
      const userData = await this.userRepository.findOne<User>({
        where: { id: userId },
      });

      return userData || null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  userLogout = async (reqData: User) => {
    /** Update online status to offline */
    await this.userRepository.update(
      { onlineStatus: '2' },
      {
        where: {
          id: reqData.id,
        },
      },
    );
  return  new UserLogoutResponseDTO(HttpStatus.OK, {}, logoutMessage);
  };
}
