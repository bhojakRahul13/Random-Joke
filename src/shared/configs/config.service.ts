import { Injectable } from '@nestjs/common';
import { SequelizeOptions } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';
import { config } from '../../config';

@Injectable()
export class ConfigService {
  get sequelizeOrmConfig() {
    const options: SequelizeOptions = {
      dialect: 'mysql' as Dialect,
      host: config().DB_HOST,
      port: config().DB_PORT,
      username: config().DB_USERNAME,
      password: config().DB_PASSWORD,
      database: config().DB_NAME,
      logging: false,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
        evict: 20000,
      },
      minifyAliases: false,
    };
    return options;
  }
}
