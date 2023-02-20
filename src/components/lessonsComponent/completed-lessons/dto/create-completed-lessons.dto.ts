import { IsNumber } from 'class-validator';

export class CreateCompletedLessonsDto {
  @IsNumber({}, { message: 'The value must be a number' })
  user_id: number;

  @IsNumber({}, { message: 'The value must be a number' })
  lesson_id: number;
}
