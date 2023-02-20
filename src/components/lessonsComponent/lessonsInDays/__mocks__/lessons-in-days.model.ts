import { lessonsInDaysStub } from '../test/stubs/lessons-in-days.stub';

export const LessonsInDaysModel = {
  create: jest.fn().mockImplementation(() => {
    return lessonsInDaysStub();
  }),
  findAll: jest.fn().mockImplementation(() => {
    return [lessonsInDaysStub()];
  }),
  findOne: jest.fn().mockImplementation(() => {
    return lessonsInDaysStub();
  }),
  findByPk: jest.fn().mockImplementation(() => {
    return lessonsInDaysStub();
  }),
  update: jest.fn().mockImplementation(() => {
    return 1;
  }),
  destroy: jest.fn().mockImplementation(() => {
    return 1;
  }),
};
