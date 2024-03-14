import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { UserController } from './user.controller';
import { userProviders } from './user.provider';
import { UserService } from './user.service';
import { HttpModule } from '@nestjs/axios';
import { IsEmailExistOrPasswordMatchConstraint } from 'src/shared/validate/email-exist-validation';
@Module({
  imports: [SharedModule, HttpModule],
  providers: [
    UserService,
    ...userProviders,
    IsEmailExistOrPasswordMatchConstraint
 ],
  controllers: [UserController],
  exports: [
    UserService,
  ],
})
export class UserModule {}
