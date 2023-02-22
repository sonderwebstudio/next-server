import { CompletedLessons } from '../../../../src/components/lessonsComponent/completed-lessons/models/completed-lessons.model';

export const completedLessonsStub = (): CompletedLessons => {
  return <CompletedLessons>{
    id: expect.any(Number),
    user_id: expect.any(String),
    lesson_id: expect.any(Number),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  };
};
