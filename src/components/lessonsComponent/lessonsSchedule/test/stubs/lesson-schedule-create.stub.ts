import { CreateLessonScheduleDto } from '../../dto/create-lesson-schedule.dto';

export const lessonScheduleCreateStub = (): CreateLessonScheduleDto => {
  return <CreateLessonScheduleDto>{
    week_id: 1,
    day_id: 1,
    lesson_id: 1,
  };
};
