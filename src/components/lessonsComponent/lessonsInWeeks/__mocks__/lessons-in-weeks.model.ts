import { lessonsInWeeksStub } from '../test/stubs/lessons-in-weeks.stub';

export const LessonsInWeeksModel = {
  create: jest.fn().mockImplementation(() => {
    return lessonsInWeeksStub();
  }),
  findAll: jest.fn().mockImplementation(() => {
    return [lessonsInWeeksStub()];
  }),
  findOne: jest.fn().mockImplementation(() => {
    return lessonsInWeeksStub();
  }),
  findByPk: jest.fn().mockImplementation(() => {
    return lessonsInWeeksStub();
  }),
  update: jest.fn().mockImplementation(() => {
    return 1;
  }),
  destroy: jest.fn().mockImplementation(() => {
    return 1;
  }),
};
