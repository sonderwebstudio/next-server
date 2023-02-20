import { CreateLessonsInWeeksDto } from '../../dto/create-lessons-in-weeks.dto';

export const lessonsInWeeksCreateStub = (): CreateLessonsInWeeksDto => {
  return <CreateLessonsInWeeksDto>{
    lesson_id: 1,
    week_id: 1,
  };
};
