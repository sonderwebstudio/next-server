import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CompletedLessons } from './models/completed-lessons.model';
import { EntityService } from '../../../classes/core/entity.service';

@Injectable()
export class CompletedLessonsService extends EntityService<CompletedLessons> {
  constructor(
    @InjectModel(CompletedLessons)
    protected repository: typeof CompletedLessons,
  ) {
    super(repository);
  }
}
