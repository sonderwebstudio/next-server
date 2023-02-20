import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { LessonsInWeeksService } from '../lessons-in-weeks.service';
import { LessonsInWeeks } from '../models/lessons-in-weeks.model';
import { LessonsInWeeksModel } from '../__mocks__/lessons-in-weeks.model';
import { lessonsInWeeksStub } from './stubs/lessons-in-weeks.stub';
import { lessonsInWeeksUpdateStub } from './stubs/lessons-in-weeks-update.stub';
import { lessonsInWeeksCreateStub } from './stubs/lessons-in-weeks-create.stub';

describe('LessonsInWeeksService', () => {
  let service: LessonsInWeeksService;
  let model: typeof LessonsInWeeks;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LessonsInWeeksService,
        {
          provide: getModelToken(LessonsInWeeks),
          useValue: LessonsInWeeksModel,
        },
      ],
    }).compile();

    service = module.get<LessonsInWeeksService>(LessonsInWeeksService);
    model = module.get<typeof LessonsInWeeks>(getModelToken(LessonsInWeeks));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    describe('when create is called', () => {
      let client: LessonsInWeeks;

      beforeEach(async () => {
        client = await service.create(lessonsInWeeksCreateStub());
      });

      it('should call model create', () => {
        expect(model.create).toBeCalled();
      });

      it('should return a client', () => {
        expect(client).toBeDefined();
      });
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });

    describe('when findAll is called', () => {
      let lessonsInWeeks: LessonsInWeeks[];

      beforeEach(async () => {
        lessonsInWeeks = await service.findAll();
      });

      it('should call model findAll', () => {
        expect(model.findAll).toBeCalled();
      });

      it('should return a lessonsInWeeks', () => {
        expect(lessonsInWeeks).toEqual([lessonsInWeeksStub()]);
      });
    });
  });

  describe('findByPk', () => {
    it('should be defined', () => {
      expect(service.findByPk).toBeDefined();
    });

    describe('when findByPk is called', () => {
      let client: LessonsInWeeks;

      beforeEach(async () => {
        client = await service.findByPk(lessonsInWeeksStub().id);
      });

      it('should call model findByPk', () => {
        expect(model.findByPk).toBeCalled();
      });

      it('should return a client', () => {
        expect(client).toEqual(lessonsInWeeksStub());
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
        result = await service.update(lessonsInWeeksUpdateStub());
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
        result = await service.destroy(lessonsInWeeksStub().id);
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
