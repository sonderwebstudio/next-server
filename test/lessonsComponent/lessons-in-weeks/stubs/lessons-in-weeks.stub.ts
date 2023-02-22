import { LessonsInWeeks } from '../../../../src/components/lessonsComponent/lessonsInWeeks/models/lessons-in-weeks.model';

export const lessonsInWeeksStub = (): LessonsInWeeks => {
  return <LessonsInWeeks>{
    id: expect.any(Number),
    lesson_id: expect.any(Number),
    week_id: expect.any(Number),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  };
};
