import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { LessonsInDaysService } from '../lessons-in-days.service';
import { LessonsInDays } from '../models/lessons-in-days.model';
import { LessonsInDaysModel } from '../__mocks__/lessons-in-days.model';
import { lessonsInDaysStub } from './stubs/lessons-in-days.stub';
import { lessonsInDaysUpdateStub } from './stubs/lessons-in-days-update.stub';
import { lessonsInDaysCreateStub } from './stubs/lessons-in-days-create.stub';

describe('LessonsInDaysService', () => {
  let service: LessonsInDaysService;
  let model: typeof LessonsInDays;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LessonsInDaysService,
        {
          provide: getModelToken(LessonsInDays),
          useValue: LessonsInDaysModel,
        },
      ],
    }).compile();

    service = module.get<LessonsInDaysService>(LessonsInDaysService);
    model = module.get<typeof LessonsInDays>(getModelToken(LessonsInDays));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    describe('when create is called', () => {
      let lessonInDays: LessonsInDays;

      beforeEach(async () => {
        lessonInDays = await service.create(lessonsInDaysCreateStub());
      });

      it('should call model create', () => {
        expect(model.create).toBeCalled();
      });

      it('should return a lessonInDays', () => {
        expect(lessonInDays).toBeDefined();
      });
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });

    describe('when findAll is called', () => {
      let lessonsInDays: LessonsInDays[];

      beforeEach(async () => {
        lessonsInDays = await service.findAll();
      });

      it('should call model findAll', () => {
        expect(model.findAll).toBeCalled();
      });

      it('should return a lessonsInDays', () => {
        expect(lessonsInDays).toEqual([lessonsInDaysStub()]);
      });
    });
  });

  describe('findByPk', () => {
    it('should be defined', () => {
      expect(service.findByPk).toBeDefined();
    });

    describe('when findByPk is called', () => {
      let lessonInDays: LessonsInDays;

      beforeEach(async () => {
        lessonInDays = await service.findByPk(lessonsInDaysStub().id);
      });

      it('should call model findByPk', () => {
        expect(model.findByPk).toBeCalled();
      });

      it('should return a lessonInDays', () => {
        expect(lessonInDays).toEqual(lessonsInDaysStub());
      });
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    describe('when update is called', () => {
      let result: number[];

      beforeEach(async () => {
        result = await service.update(lessonsInDaysUpdateStub());
      });

      it('should call model update', () => {
        expect(model.update).toBeCalled();
      });

      it('should return a number of updated records', () => {
        expect(result).toEqual(1);
      });
    });
  });

  describe('destroy', () => {
    it('should be defined', () => {
      expect(service.destroy).toBeDefined();
    });

    describe('when destroy is called', () => {
      let result: number;

      beforeEach(async () => {
        result = await service.destroy(lessonsInDaysStub().id);
      });

      it('should call model destroy', () => {
        expect(model.destroy).toBeCalled();
      });

      it('should return a number of deleted records', () => {
        expect(result).toEqual(1);
      });
    });
  });
});
