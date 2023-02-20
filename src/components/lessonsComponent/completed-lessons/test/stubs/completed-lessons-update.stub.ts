import { UpdateCompletedLessonsDto } from '../../dto/update-completed-lessons.dto';

export const completedLessonsUpdateStub = (): UpdateCompletedLessonsDto => {
  return <UpdateCompletedLessonsDto>{
    user_id: 1,
    lesson_id: 1,
  };
};
