import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from './configs/config.service';
import { HelperService } from './services/helper';

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    ConfigService,
    HelperService
  ],
  exports: [
    ConfigService,
    HelperService,
  ],
  controllers: [],
})
export class SharedModule {}
