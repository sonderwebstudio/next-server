import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { lessonsInWeeksCreateStub } from './stubs/lessons-in-weeks-create.stub';
import { lessonsInWeeksStub } from './stubs/lessons-in-weeks.stub';
import { AppGenerator } from '../../classes/app-generator';
import { TokenGenerator } from '../../classes/token-generator';
import { AppInitializer } from '../../classes/app-initializer';
import { LessonsInWeeks } from '../../../src/components/lessonsComponent/lessonsInWeeks/models/lessons-in-weeks.model';

describe('LessonsInWeeks (e2e)', () => {
  let app: INestApplication;
  let tokenAdmin: string;
  let tokenUser: string;
  let lessonInWeek: LessonsInWeeks;

  beforeAll(async () => {
    AppInitializer.jestSetTimeout();
    app = await AppGenerator.getApp();
    await AppInitializer.appInitialization();
    tokenAdmin = await TokenGenerator.getAdminToken();
    tokenUser = await TokenGenerator.getUserToken();
  });

  describe('/api/lessons-in-weeks (POST)', () => {
    it('should create a lessonInWeek and return status HttpStatus.CREATED because it a Admin', async () => {
      await request(app.getHttpServer())
        .post('/api/lessons-in-weeks')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send(lessonsInWeeksCreateStub())
        .expect(HttpStatus.CREATED)
        .then((response) => {
          lessonInWeek = response.body.response;
        });
    });

    it('should return status HttpStatus.FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons-in-weeks')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(lessonsInWeeksCreateStub())
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return status HttpStatus.FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons-in-weeks')
        .send(lessonsInWeeksCreateStub())
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return status HttpStatus.BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .post('/api/lessons-in-weeks')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/api/lessons-in-weeks (GET)', () => {
    it('should return lessonsInWeeks and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons-in-weeks')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          console.log(response.body.response[0]);
          expect(response.body.response[0]).toEqual(lessonsInWeeksStub());
        });
    });

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons-in-weeks')
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons-in-weeks')
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  describe('/api/lessons-in-weeks/:id (GET)', () => {
    it('should return a lessonInWeek and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons-in-weeks/' + lessonInWeek.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(lessonsInWeeksStub());
        });
    });

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons-in-weeks/' + lessonInWeek.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/lessons-in-weeks/' + lessonInWeek.id)
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  describe('/api/lessons-in-weeks/:id (DELETE)', () => {
    it('should delete a lessonInWeek', async () => {
      await request(app.getHttpServer())
        .delete('/api/lessons-in-weeks/' + lessonInWeek.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .then((response) => {
          expect(response.body.response).toEqual(1);
        });
    });

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .delete('/api/lessons-in-weeks/' + lessonInWeek.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .delete('/api/lessons-in-weeks/' + lessonInWeek.id)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('should return status NOT_FOUND because it empty request', async () => {
      await request(app.getHttpServer())
        .delete('/api/lessons-in-weeks/')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
