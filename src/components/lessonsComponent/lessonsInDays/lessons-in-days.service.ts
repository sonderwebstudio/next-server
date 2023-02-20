import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EntityService } from '../../../classes/core/entity.service';
import { LessonsInDays } from './models/lessons-in-days.model';

@Injectable()
export class LessonsInDaysService extends EntityService<LessonsInDays> {
  constructor(
    @InjectModel(LessonsInDays)
    protected repository: typeof LessonsInDays,
  ) {
    super(repository);
  }
}
