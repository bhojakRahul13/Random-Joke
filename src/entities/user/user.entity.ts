import {
  Column,
  DataType,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { GenderEnum } from 'src/shared/enum/gender';

@Table({
  tableName: 'users',
  timestamps: false,
  freezeTableName: true,
})
export class User extends Model<User> {
  @Column({
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  phone: string;

  @Column
  password: string;

  @Column({
    type: DataType.ENUM,
    values: ['1', '2', '3'],
    allowNull: true,
    comment: '1 : male, 2 : female, 3 : other',
    defaultValue: null,
  })
  gender: string;

  @Column({
    type: DataType.ENUM,
    values: ['1', '2', '3'],
    allowNull: true,
    comment: '1: online, 2: offline',
    defaultValue: '2',
  })
   onlineStatus: string;
  
  
   @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  isDeleted: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: Sequelize.fn('now'),
  })
  firstCreated: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: Sequelize.fn('now'),
  })
  lastModified: Date;


}
