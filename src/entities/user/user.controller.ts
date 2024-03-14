import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  Request,
  UseFilters,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  UserLoginResponse,
  UserRegisterResponse,
  userLogoutResponse,
} from 'src/shared/constants/swagger/api-response/user';
import { StaticAuthGuard } from 'src/shared/guards/auth.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt.auth';
import { UserLoginRequestDTO } from './dto/login-dto/login-request.dto';
import { UserService } from './user.service';
import { AllExceptionsFilter } from 'src/shared/exception/HttpExceptionFilter';
import { RegisterUserRequest } from './dto/register-dto/register-request.dto';

@ApiTags('Users')
@Controller('api/users')
@UseFilters(AllExceptionsFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Register user
   * @Body  reqData
   * @returns
   */

  @Post('signup')
  @UseGuards(StaticAuthGuard)
  @ApiOkResponse(UserRegisterResponse)
  @HttpCode(201)
  public async registerUser(@Body() reqData: RegisterUserRequest) {
    return await this.userService.registerUser(reqData);
  }

  /**
   * --------------------------------------------------------------------------------
   * * Login API
   * @param email:string,
   * @param passeord:string,
   * ? This API is used for Login purpose
   */
  @Post('login')
  @UseGuards(StaticAuthGuard)
  @ApiOkResponse(UserLoginResponse)
  @ApiOperation({ summary: 'Login User API' })
  @HttpCode(200)
  public async login(@Body() reqData: UserLoginRequestDTO) {
    return this.userService.login(reqData);
  }

  /**
   * --------------------------------------------------------------------------------
   * * Get user By Id API
   * @param userId:string
   * ? This API is used for Get user purpose
   */
  @Get('/me')
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard, StaticAuthGuard)
  @ApiOperation({ summary: 'Get User profile API' })
  @HttpCode(200)
  public async getUserProfile(@Req() request: Request) {
    return this.userService.getUserProfileDetail(request['user']);
  }

  /**
   * --------------------------------------------------------------------------------
   *  User logout API
   */
  @Post('/logout')
  @ApiOperation({ summary: 'User logout API' })
  @UseGuards(JwtAuthGuard, StaticAuthGuard)
  @ApiOkResponse(userLogoutResponse)
  @HttpCode(200)
  public async adminLogout(@Req() request: Request) {
    return this.userService.userLogout(request['user']);
  }
}
