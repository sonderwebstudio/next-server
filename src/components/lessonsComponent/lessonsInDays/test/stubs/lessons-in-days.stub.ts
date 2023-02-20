import { LessonsInDays } from '../../models/lessons-in-days.model';

export const lessonsInDaysStub = (): LessonsInDays => {
  return <LessonsInDays>{
    id: 1,
    lesson_id: 1,
    day_id: 1,
  };
};
