import { Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { EntityModel } from '../../../../classes/core/entity.model';
import { LessonsInWeeks } from '../../lessonsInWeeks/models/lessons-in-weeks.model';

interface WeeksCreationAttrs {
  name: string;
}

@Table({ tableName: 'Weeks' })
export class Weeks extends EntityModel<Weeks, WeeksCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => LessonsInWeeks)
  lessonsInWeeks: LessonsInWeeks[];
}
