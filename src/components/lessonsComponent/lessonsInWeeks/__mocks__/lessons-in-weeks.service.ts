import { lessonsInWeeksStub } from '../test/stubs/lessons-in-weeks.stub';

export const LessonsInWeeksService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(lessonsInWeeksStub()),
  findAll: jest.fn().mockResolvedValue([lessonsInWeeksStub()]),
  findByPk: jest.fn().mockResolvedValue(lessonsInWeeksStub()),
  findByName: jest.fn().mockResolvedValue(lessonsInWeeksStub()),
  update: jest.fn().mockResolvedValue({ affectedCount: 1 }),
  destroy: jest.fn().mockResolvedValue(1),
});
