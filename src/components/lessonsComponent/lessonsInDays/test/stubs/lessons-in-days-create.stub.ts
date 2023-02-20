import { CreateLessonsInDaysDto } from '../../dto/create-lessons-in-days.dto';

export const lessonsInDaysCreateStub = (): CreateLessonsInDaysDto => {
  return <CreateLessonsInDaysDto>{
    lesson_id: 1,
    day_id: 1,
  };
};
