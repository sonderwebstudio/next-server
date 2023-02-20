import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { Users } from '../../../../components/usersComponent/users/models/users.model';
import { EntityModel } from '../../../../classes/core/entity.model';
import { Lessons } from '../../lessons/models/lessons.model';

interface CompletedLessonsCreationAttrs {
  lesson_id: number;
  user_id: number;
  deleted_at: string | null;
  deleted_by: number | null;
}

@Table({ tableName: 'CompletedLessons' })
export class CompletedLessons extends EntityModel<
  CompletedLessons,
  CompletedLessonsCreationAttrs
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

  @Column({ type: DataType.NUMBER })
  deleted_by: number | null;

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @ForeignKey(() => Lessons)
  @Column({ type: DataType.INTEGER, allowNull: false })
  lesson_id: number;
}
