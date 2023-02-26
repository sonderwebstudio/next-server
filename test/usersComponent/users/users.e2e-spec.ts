import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { usersStub, usersStubWithoutRoles } from './stubs/users.stub'
import { usersCreateStub } from './stubs/users-create.stub'
import { AppGenerator } from '../../classes/app-generator'
import { TokenGenerator } from '../../classes/token-generator'
import { AppInitializer } from '../../classes/app-initializer'
import { ROLES } from '../../../src/constants/roles.constants'
import { Users } from '../../../src/components/usersComponent/users/models/users.model'

describe('Users (e2e)', () => {
  let app: INestApplication
  let tokenAdmin: string
  let tokenUser: string
  let user: Users

  beforeAll(async () => {
    AppInitializer.jestSetTimeout()
    app = await AppGenerator.getApp()
    await AppInitializer.appInitialization()
    tokenAdmin = await TokenGenerator.getAdminToken()
    tokenUser = await TokenGenerator.getUserToken()
  })

  describe('/api/users (POST)', () => {
    it('should create a user', async () => {
      await request(app.getHttpServer())
        .post('/api/users')
        .send(usersCreateStub())
        .expect(HttpStatus.CREATED)
        .then((response) => {
          user = response.body.response
        })
    })

    it('should return status BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer()).post('/api/users').expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/api/users (PUT)', () => {
    it('should update a user', async () => {
      await request(app.getHttpServer())
        .put('/api/users')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send({ id: user.id })
        .then((response) => {
          // FIXME: пока нечего менять, нужно потом добавить что-нибудь
          expect(response.body.response).toEqual([0])
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .put('/api/users')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send(user)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer()).put('/api/users').send(user).expect(HttpStatus.FORBIDDEN)
    })

    it('should return status BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .put('/api/users')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/api/users/add/role (PUT)', () => {
    it('should add role to user', async () => {
      await request(app.getHttpServer())
        .put('/api/users/add/role')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send({
          userEmail: user.email,
          roleName: ROLES.ADMIN,
        })
        .expect(HttpStatus.OK)
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .put('/api/users/add/role')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send({
          userEmail: user.email,
          roleName: ROLES.ADMIN,
        })
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .put('/api/users/add/role')
        .send({
          userEmail: user.email,
          roleName: ROLES.ADMIN,
        })
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .put('/api/users/add/role')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/api/users/remove/role (DELETE)', () => {
    it('should remove role to user', async () => {
      await request(app.getHttpServer())
        .delete('/api/users/remove/role')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .send({
          userEmail: user.email,
          roleName: ROLES.ADMIN,
        })
        .expect(HttpStatus.OK)
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .delete('/api/users/remove/role')
        .set('Authorization', 'Bearer ' + tokenUser)
        .send({
          userEmail: user.email,
          roleName: ROLES.ADMIN,
        })
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .delete('/api/users/remove/role')
        .send({
          userEmail: user.email,
          roleName: ROLES.ADMIN,
        })
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status BAD_REQUEST because it empty request', async () => {
      await request(app.getHttpServer())
        .delete('/api/users/remove/role')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('/api/users (GET)', () => {
    it('should return status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/users')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/users')
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer()).get('/api/users').expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/api/users/:id (GET)', () => {
    it('should return a user and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/users/' + user.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(usersStubWithoutRoles())
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/users/' + user.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/users/' + user.id)
        .expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/api/users/email/:email (GET)', () => {
    it('should return a user and status OK because it a Admin', async () => {
      await request(app.getHttpServer())
        .get('/api/users/email/' + user.email)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.response).toEqual(usersStub())
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .get('/api/users/email/' + user.email)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .get('/api/users/email/' + user.email)
        .expect(HttpStatus.FORBIDDEN)
    })
  })

  describe('/api/users/:id (DELETE)', () => {
    it('should delete a user', async () => {
      await request(app.getHttpServer())
        .delete('/api/users/' + user.id)
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .then((response) => {
          expect(response.body.response).toEqual(1)
        })
    })

    it('should return status FORBIDDEN because it a User', async () => {
      await request(app.getHttpServer())
        .delete('/api/users/' + user.id)
        .set('Authorization', 'Bearer ' + tokenUser)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status FORBIDDEN because it a Unknown', async () => {
      await request(app.getHttpServer())
        .delete('/api/users/' + user.id)
        .expect(HttpStatus.FORBIDDEN)
    })

    it('should return status NOT_FOUND because it empty request', async () => {
      await request(app.getHttpServer())
        .delete('/api/users/')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(HttpStatus.NOT_FOUND)
    })
  })
})
