import { UpdateLessonScheduleDto } from '../../dto/update-lesson-schedule.dto';

export const lessonScheduleUpdateStub = (): UpdateLessonScheduleDto => {
  return <UpdateLessonScheduleDto>{
    week_id: 1,
    day_id: 1,
    lesson_id: 1,
  };
};
