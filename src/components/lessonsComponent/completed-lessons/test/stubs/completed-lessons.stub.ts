import { CompletedLessons } from '../../models/completed-lessons.model';

export const completedLessonsStub = (): CompletedLessons => {
  return <CompletedLessons>{
    id: 1,
    user_id: 1,
    lesson_id: 1,
  };
};
