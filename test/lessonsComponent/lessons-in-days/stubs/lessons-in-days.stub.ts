import { LessonsInDays } from '../../../../src/components/lessonsComponent/lessonsInDays/models/lessons-in-days.model';

export const lessonsInDaysStub = (): LessonsInDays => {
  return <LessonsInDays>{
    id: expect.any(Number),
    lesson_id: expect.any(Number),
    day_id: expect.any(Number),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  };
};
