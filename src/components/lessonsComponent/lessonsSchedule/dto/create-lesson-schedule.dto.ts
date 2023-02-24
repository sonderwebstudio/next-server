import { IsNumber } from 'class-validator';

export class CreateLessonScheduleDto {
  @IsNumber({}, { message: 'The value must be a number' })
  lesson_id: number;

  @IsNumber({}, { message: 'The value must be a number' })
  week_id: number;

  @IsNumber({}, { message: 'The value must be a number' })
  day_id: number;
}
