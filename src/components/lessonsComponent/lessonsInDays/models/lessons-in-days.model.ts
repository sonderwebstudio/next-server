import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { EntityModel } from '../../../../classes/core/entity.model';
import { Days } from '../../days/models/days.model';
import { Lessons } from '../../lessons/models/lessons.model';

interface LessonsInDaysCreationAttrs {
  lesson_id: number;
  day_id: number;
  deleted_at: string | null;
  deleted_by: number | null;
}

@Table({ tableName: 'LessonsInDays' })
export class LessonsInDays extends EntityModel<
  LessonsInDays,
  LessonsInDaysCreationAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  deleted_at: string | null;

  @Column({ type: DataType.STRING })
  deleted_by: number | null;

  @ForeignKey(() => Lessons)
  @Column({ type: DataType.INTEGER, allowNull: false })
  lesson_id: number;

  @ForeignKey(() => Days)
  @Column({ type: DataType.INTEGER, allowNull: false })
  day_id: number;
}
