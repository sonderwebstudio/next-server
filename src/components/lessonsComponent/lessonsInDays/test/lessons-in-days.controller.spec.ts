import { Test } from '@nestjs/testing';
import { lessonsInDaysStub } from './stubs/lessons-in-days.stub';
import { JwtService } from '@nestjs/jwt';
import { LessonsInDaysController } from '../lessons-in-days.controller';
import { LessonsInDaysService } from '../lessons-in-days.service';
import { LessonsInDays } from '../models/lessons-in-days.model';
import { lessonsInDaysCreateStub } from './stubs/lessons-in-days-create.stub';
import { lessonsInDaysUpdateStub } from './stubs/lessons-in-days-update.stub';

jest.mock('../lessons-in-days.service');

describe('LessonsInDaysController', () => {
  let controller: LessonsInDaysController;
  let service: LessonsInDaysService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [LessonsInDaysController],
      providers: [
        LessonsInDaysService,
        {
          provide: JwtService,
          useValue: JwtService,
        },
      ],
    }).compile();

    controller = module.get<LessonsInDaysController>(LessonsInDaysController);
    service = module.get<LessonsInDaysService>(LessonsInDaysService);
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    describe('when create is called', () => {
      let lessonInDays: LessonsInDays;

      beforeEach(async () => {
        lessonInDays = (await controller.create(lessonsInDaysCreateStub()))
          .response;
      });

      it('should call lessonsInDaysService', () => {
        expect(service.create).toBeCalledWith(lessonsInDaysCreateStub());
      });

      it('should return a lessonInDays', () => {
        expect(lessonInDays).toEqual(lessonsInDaysStub());
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
        lessonsInDays = (await controller.findAll()).response;
      });

      it('should call lessonsInDaysService', () => {
        expect(service.findAll).toBeCalledWith();
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
        lessonInDays = (await controller.findByPk(lessonsInDaysStub().id))
          .response;
      });

      it('should call lessonsInDaysService', () => {
        expect(service.findByPk).toBeCalledWith(lessonsInDaysStub().id);
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
      let result;

      beforeEach(async () => {
        result = (await controller.update(lessonsInDaysUpdateStub())).response;
      });

      it('should call lessonsInDaysService', () => {
        expect(service.update).toBeCalledWith(lessonsInDaysUpdateStub());
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
        result = (await controller.destroy(lessonsInDaysStub().id)).response;
      });

      it('should call lessonsInDaysService', () => {
        expect(service.destroy).toBeCalledWith(lessonsInDaysStub().id);
      });

      it('should return a affected count', () => {
        expect(result).toEqual(1);
      });
    });
  });
});
