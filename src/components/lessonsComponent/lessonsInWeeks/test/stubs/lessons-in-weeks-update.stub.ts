import { UpdateLessonsInWeeksDto } from '../../dto/update-lessons-in-weeks.dto';

export const lessonsInWeeksUpdateStub = (): UpdateLessonsInWeeksDto => {
  return <UpdateLessonsInWeeksDto>{
    lesson_id: 1,
    week_id: 1,
  };
};
