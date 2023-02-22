import { CreateLessonsInDaysDto } from '../../../../src/components/lessonsComponent/lessonsInDays/dto/create-lessons-in-days.dto';

export const lessonsInDaysCreateStub = (): CreateLessonsInDaysDto =>
  <CreateLessonsInDaysDto>{
    lesson_id: 1,
    day_id: 1,
  };
