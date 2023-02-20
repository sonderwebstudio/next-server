import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { EntityModel } from '../../../../classes/core/entity.model';
import { Weeks } from '../../weeks/models/weeks.model';
import { Lessons } from '../../lessons/models/lessons.model';

interface LessonsInWeeksCreationAttrs {
  lesson_id: number;
  week_id: number;
  deleted_at: string | null;
  deleted_by: number | null;
}

@Table({ tableName: 'LessonsInWeeks' })
export class LessonsInWeeks extends EntityModel<
  LessonsInWeeks,
  LessonsInWeeksCreationAttrs
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

  @ForeignKey(() => Weeks)
  @Column({ type: DataType.INTEGER, allowNull: false })
  week_id: number;
}
