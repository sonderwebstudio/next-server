import { lessonsInDaysStub } from '../test/stubs/lessons-in-days.stub';

export const LessonsInDaysService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(lessonsInDaysStub()),
  findAll: jest.fn().mockResolvedValue([lessonsInDaysStub()]),
  findByPk: jest.fn().mockResolvedValue(lessonsInDaysStub()),
  findByName: jest.fn().mockResolvedValue(lessonsInDaysStub()),
  update: jest.fn().mockResolvedValue({ affectedCount: 1 }),
  destroy: jest.fn().mockResolvedValue(1),
});
