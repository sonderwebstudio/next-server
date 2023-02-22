import { Lessons } from '../../../../src/components/lessonsComponent/lessons/models/lessons.model';

export const lessonsStub = (): Lessons => {
  return <Lessons>{
    id: expect.any(Number),
    name: expect.any(String),
    image: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  };
};
