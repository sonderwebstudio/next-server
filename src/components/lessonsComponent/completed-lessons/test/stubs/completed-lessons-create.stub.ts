import { CreateCompletedLessonsDto } from '../../dto/create-completed-lessons.dto';

export const completedLessonsCreateStub = (): CreateCompletedLessonsDto => {
  return <CreateCompletedLessonsDto>{
    user_id: 1,
    lesson_id: 1,
  };
};
