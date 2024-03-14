import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { config } from 'src/config';
import { UserService } from 'src/entities/user/user.service';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config().JSON_WEB_TOKEN_SECRET_KEY,
    });
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;
    const user = await this.userService.isValidateUser(id);

    if (!user) {
      throw new UnauthorizedException('Unauthorized token');
    }
    return payload;
  }
}

@Injectable()
export class StaticAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.statictoken?.split(' ')[1] || null;

    if (!token) {
      throw new UnauthorizedException('Add staticToken  in the headers');
    }

    if (token !== config().STATIC_JSON_WEB_TOKEN_SECRET_KEY) {
      throw new UnauthorizedException('Invalid static Token');
    }

    return true;
  }
}
