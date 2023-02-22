import { Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { EntityModel } from '../../../../classes/core/entity.model';
import { LessonsInCourses } from '../../lessonsInCourses/models/lessons-in-courses.model';

interface CoursesCreationAttrs {
  name: string;
  image: string;
  description: string;
  deleted_at: string | null;
  deleted_by: string | null;
}

@Table({ tableName: 'Courses' })
export class Courses extends EntityModel<Courses, CoursesCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.STRING })
  deleted_at: string | null;

<<<<<<< HEAD
  @Column({ type: DataType.INTEGER })
  deleted_by: number | null;
=======
  @Column({ type: DataType.STRING })
  deleted_by: string | null;
>>>>>>> c60680709809ff31c16e78f211708c9a328cd5dd

  @HasMany(() => LessonsInCourses)
  lessonsInCourses: LessonsInCourses[];
}
