import { IsNumber } from 'class-validator';

export class UpdateCompletedLessonsDto {
  @IsNumber({}, { message: 'The value must be a number' })
  user_id: string;

  @IsNumber({}, { message: 'The value must be a number' })
  lesson_id: number;
}
