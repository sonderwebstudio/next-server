import { UpdateLessonsInDaysDto } from '../../dto/update-lessons-in-days.dto';

export const lessonsInDaysUpdateStub = (): UpdateLessonsInDaysDto => {
  return <UpdateLessonsInDaysDto>{
    lesson_id: 1,
    day_id: 1,
  };
};
