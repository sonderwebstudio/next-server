import { LessonsInWeeks } from '../../models/lessons-in-weeks.model';

export const lessonsInWeeksStub = (): LessonsInWeeks => {
  return <LessonsInWeeks>{
    id: 1,
    lesson_id: 1,
    week_id: 1,
  };
};
