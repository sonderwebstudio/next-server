import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EntityService } from '../../../classes/core/entity.service';
import { LessonsInCourses } from './models/lessons-in-courses.model';

@Injectable()
export class LessonsInCoursesService extends EntityService<LessonsInCourses> {
  constructor(
    @InjectModel(LessonsInCourses)
    protected repository: typeof LessonsInCourses,
  ) {
    super(repository);
  }
}
