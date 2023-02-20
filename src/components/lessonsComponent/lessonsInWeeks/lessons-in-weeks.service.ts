import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EntityService } from '../../../classes/core/entity.service';
import { LessonsInWeeks } from './models/lessons-in-weeks.model';

@Injectable()
export class LessonsInWeeksService extends EntityService<LessonsInWeeks> {
  constructor(
    @InjectModel(LessonsInWeeks)
    protected repository: typeof LessonsInWeeks,
  ) {
    super(repository);
  }
}
