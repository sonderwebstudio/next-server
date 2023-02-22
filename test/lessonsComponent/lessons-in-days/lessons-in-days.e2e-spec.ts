import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppGenerator } from '../../classes/app-generator';
import { TokenGenerator } from '../../classes/token-generator';
import { AppInitializer } from '../../classes/app-initializer';
import { LessonsInDays } from '../../../src/components/lessonsComponent/lessonsInDays/models/lessons-in-days.model';
import { lessonsInDaysCreateStub } from './stubs/lessons-in-days-create.stub';
import { lessonsInDaysStub } from './stubs/lessons-in-days.stub';

describe('LessonsInDays (e2e)', () => {
  let app: INestApplication;
  let tokenAdmin: string;
  let tokenUser: string;
  let lessonInDay: LessonsInDays;

  beforeAll(async () => {
    AppInitializer.jestSetTimeout();
    app = await AppGenerator.getApp();
    await AppInitializer.appInitialization();
    tokenAdmin = await TokenGenerator.getAdminToken();
    tokenUser = await TokenGenerator.getUserToken();
  });

  describe('/api/lessons-in-days (POST)', () => {
    it('should create a lessonInDay and return status HttpStatus.CREATED because it a Admin', async () => {
      await request(app.getHttpServer())
        .post('/api/lessons-in-days')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(lessonsInDaysCreateStub())
        .expect(HttpStatus.CREATED)
        .then((response) => {
          lessonInDay = response.body.response;
        });
    });

    it('should return status HttpStatus.FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons-in-days')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(lessonsInDaysCreateStub())
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return status HttpStatus.FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons-in-days')
        .send(lessonsInDaysCreateStub())
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return status HttpStatus.BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .post('/api/lessons-in-days')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/api/lessons-in-days (GET)', () => {
    it('should return lessonsInDays and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons-in-days')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          console.log(response.body.response[0]);
          expect(response.body.response[0]).toEqual(lessonsInDaysStub());
        });
    });

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons-in-days')
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons-in-days')
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  describe('/api/lessons-in-days/:id (GET)', () => {
    it('should return a lessonInDay and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons-in-days/' + lessonInDay.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(lessonsInDaysStub());
        });
    });

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons-in-days/' + lessonInDay.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons-in-days/' + lessonInDay.id)
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  describe('/api/lessons-in-days/:id (DELETE)', () => {
    it('should delete a lessonInDay', async () => {
      await request(app.getHttpServer())
        .delete('/api/lessons-in-days/' + lessonInDay.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .then((response) => {
          expect(response.body.response).toEqual(1);
        });
    });

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .delete('/api/lessons-in-days/' + lessonInDay.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .delete('/api/lessons-in-days/' + lessonInDay.id)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return status NOT_FOUND because it empty request', async () => {
      await request(app.getHttpServer())
        .delete('/api/lessons-in-days/')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
