import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LessonsInDaysController } from './lessons-in-days.controller';
import { LessonsInDaysService } from './lessons-in-days.service';
import { LessonsInDays } from './models/lessons-in-days.model';

@Module({
  providers: [LessonsInDaysService],
  controllers: [LessonsInDaysController],
  imports: [SequelizeModule.forFeature([LessonsInDays])],
  exports: [SequelizeModule, LessonsInDaysService],
})
export class LessonsInDaysModule {}
