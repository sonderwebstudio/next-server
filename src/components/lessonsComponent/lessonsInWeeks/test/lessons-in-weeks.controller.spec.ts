import { Test } from '@nestjs/testing';
import { lessonsInWeeksStub } from './stubs/lessons-in-weeks.stub';
import { JwtService } from '@nestjs/jwt';
import { LessonsInWeeksController } from '../lessons-in-weeks.controller';
import { LessonsInWeeksService } from '../lessons-in-weeks.service';
import { LessonsInWeeks } from '../models/lessons-in-weeks.model';
import { lessonsInWeeksCreateStub } from './stubs/lessons-in-weeks-create.stub';
import { lessonsInWeeksUpdateStub } from './stubs/lessons-in-weeks-update.stub';

jest.mock('../lessons-in-weeks.service');

describe('LessonsInWeeksController', () => {
  let controller: LessonsInWeeksController;
  let service: LessonsInWeeksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [LessonsInWeeksController],
      providers: [
        LessonsInWeeksService,
        {
          provide: JwtService,
          useValue: JwtService,
        },
      ],
    }).compile();

    controller = module.get<LessonsInWeeksController>(LessonsInWeeksController);
    service = module.get<LessonsInWeeksService>(LessonsInWeeksService);
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    describe('when create is called', () => {
      let client: LessonsInWeeks;

      beforeEach(async () => {
        client = (await controller.create(lessonsInWeeksCreateStub())).response;
      });

      it('should call lessonsInWeeksService', () => {
        expect(service.create).toBeCalledWith(lessonsInWeeksCreateStub());
      });

      it('should return a client', () => {
        expect(client).toEqual(lessonsInWeeksStub());
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
        lessonsInWeeks = (await controller.findAll()).response;
      });

      it('should call lessonsInWeeksService', () => {
        expect(service.findAll).toBeCalledWith();
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
        client = (await controller.findByPk(lessonsInWeeksStub().id)).response;
      });

      it('should call lessonsInWeeksService', () => {
        expect(service.findByPk).toBeCalledWith(lessonsInWeeksStub().id);
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
      let result;

      beforeEach(async () => {
        result = (await controller.update(lessonsInWeeksUpdateStub())).response;
      });

      it('should call lessonsInWeeksService', () => {
        expect(service.update).toBeCalledWith(lessonsInWeeksUpdateStub());
      });

      it('should return a affected count', () => {
        expect(result).toEqual({ affectedCount: 1 });
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
        result = (await controller.destroy(lessonsInWeeksStub().id)).response;
      });

      it('should call lessonsInWeeksService', () => {
        expect(service.destroy).toBeCalledWith(lessonsInWeeksStub().id);
      });

      it('should return a affected count', () => {
        expect(result).toEqual(1);
      });
    });
  });
});
