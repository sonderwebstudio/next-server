import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LessonSchedule } from './models/lesson-schedule.model';
import { EntityService } from '../../../classes/core/entity.service';

@Injectable()
export class LessonScheduleService extends EntityService<LessonSchedule> {
  constructor(
    @InjectModel(LessonSchedule)
    protected repository: typeof LessonSchedule,
  ) {
    super(repository);
  }

  
}
