import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { Users } from '../../../usersComponent/users/models/users.model';
import { EntityModel } from '../../../../classes/core/entity.model';
import { Lessons } from '../../lessons/models/lessons.model';

interface CompletedLessonsCreationAttrs {
  lesson_id: number;
  user_id: string;
  deleted_at: string | null;
  deleted_by: string | null;
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

<<<<<<< HEAD
  @Column({ type: DataType.INTEGER })
  deleted_by: number | null;
=======
  @Column({ type: DataType.STRING })
  deleted_by: string | null;
>>>>>>> c60680709809ff31c16e78f211708c9a328cd5dd

  @ForeignKey(() => Users)
  @Column({ type: DataType.STRING, allowNull: false })
  user_id: string;

  @ForeignKey(() => Lessons)
  @Column({ type: DataType.INTEGER, allowNull: false })
  lesson_id: number;
}
