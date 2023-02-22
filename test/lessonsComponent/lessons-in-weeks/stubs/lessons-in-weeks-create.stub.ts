import { CreateLessonsInWeeksDto } from '../../../../src/components/lessonsComponent/lessonsInWeeks/dto/create-lessons-in-weeks.dto';

export const lessonsInWeeksCreateStub = (): CreateLessonsInWeeksDto =>
  <CreateLessonsInWeeksDto>{
    lesson_id: 1,
    week_id: 1,
  };
