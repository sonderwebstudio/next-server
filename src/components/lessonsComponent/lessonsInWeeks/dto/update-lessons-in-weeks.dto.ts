import { IsNumber } from 'class-validator';

export class UpdateLessonsInWeeksDto {
  @IsNumber({}, { message: 'The value must be a number' })
  readonly lesson_id: number;

  @IsNumber({}, { message: 'The value must be a number' })
  readonly week_id: number;
}
