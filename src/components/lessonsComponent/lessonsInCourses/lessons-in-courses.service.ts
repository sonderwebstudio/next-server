import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EntityService } from '../../../classes/core/entity.service';
import { Days } from '../days/models/days.model';
import { Lessons } from '../lessons/models/lessons.model';
import { LessonSchedule } from '../lessonsSchedule/models/lesson-schedule.model';
import { LessonsInCourses } from './models/lessons-in-courses.model';

@Injectable()
export class LessonsInCoursesService extends EntityService<LessonsInCourses> {
  constructor(
    @InjectModel(LessonsInCourses)
    protected repository: typeof LessonsInCourses,
  ) {
    super(repository);
  }

  async findByCourseId(id: string) {
    const courses = await this.repository.findAll({
      where: { course_id: id },
    });

    return await Promise.all(
      courses.map(
        async (course) =>
          await LessonSchedule.findOne({
            where: {
              lesson_id: course.lesson_id,
            },
            include: [
              {
                model: Lessons,
              },
              {
                model: Days,
              },
            ],
          }),
      ),
    );
  }

  async getSortedCourse(id: string) {
    const courses = await this.repository.findAll({
      where: { course_id: id },
    });

    const lessons = await Promise.all(
      courses.map(async (course) => {
        const lesson = await LessonSchedule.findOne({
          where: {
            lesson_id: course.lesson_id,
          },
          include: [
            {
              model: Lessons,
            },
            {
              model: Days,
            },
          ],
        });
        return lesson;
      }),
    );

    const groupedLessonsByWeek = lessons.reduce((acc, lesson) => {
      const weekIndex = lesson.week_id - 1;
      if (!acc[weekIndex]) {
        acc[weekIndex] = [];
      }
      acc[weekIndex].push(lesson);
      return acc;
    }, []);

    const sortedLessonsByWeek = groupedLessonsByWeek.map((weekLessons) => {
      const groupedLessonsByDay = weekLessons.reduce((acc, lesson) => {
        const dayIndex = lesson.day_id - 1;
        if (!acc[dayIndex]) {
          acc[dayIndex] = [];
        }
        acc[dayIndex].push(lesson);
        return acc;
      }, []);
      return groupedLessonsByDay;
    });

    const filteredLessons = sortedLessonsByWeek.map((weekLessons) =>
      weekLessons.filter((dayLessons) => dayLessons.length > 0),
    );

    return filteredLessons;
  }
}
