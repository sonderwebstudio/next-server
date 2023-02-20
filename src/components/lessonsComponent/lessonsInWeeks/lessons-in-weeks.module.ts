import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LessonsInWeeksController } from './lessons-in-weeks.controller';
import { LessonsInWeeksService } from './lessons-in-weeks.service';
import { LessonsInWeeks } from './models/lessons-in-weeks.model';

@Module({
  providers: [LessonsInWeeksService],
  controllers: [LessonsInWeeksController],
  imports: [SequelizeModule.forFeature([LessonsInWeeks])],
  exports: [SequelizeModule, LessonsInWeeksService],
})
export class LessonsInWeeksModule {}
