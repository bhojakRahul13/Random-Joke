import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/entities/user/user.entity';
import { ConfigService } from 'src/shared/configs/config.service';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize(configService.sequelizeOrmConfig);
      sequelize.addModels([
        User,
      ]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
