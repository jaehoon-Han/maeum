import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
     }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Maeum API');
  });

  describe("/users", () => {
    it("GET", () => {
      return request(app.getHttpServer())
        .get("/users")
        .expect(200)
        .expect([]);
    });
    it("POST 201", () => {
      return request(app.getHttpServer())
        .post("/users")
        .send({
          name: "Test",
          age: 11,
          gender: "female",
          password: "test",
        })
        .expect(201);
    });
  
  it("POST 400", () => {
    return request(app.getHttpServer())
      .post("/users")
      .send({
        name: "Test",
        age: 11,
        gender: "female",
        password: "test",
        other: "thing"
      })
      .expect(400);
  });
  it("DELETE", () => {
    return request(app.getHttpServer())
      .delete('/users')
      .expect(404);
  });
});


describe('/users/:id', () => {
  it('GET 200', () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200);
  });
  it('GET 404', () => {
    return request(app.getHttpServer())
      .get('/users/111')
      .expect(404);
  });
  it('PATCH 200', () => {
    return request(app.getHttpServer())
      .patch('/users/1')
      .send({ name: '새로운 한재훈' })
      .expect(200);
  });
  it('DELETE 200', () => {
    return request(app.getHttpServer())
      .delete('/users/1')
      .expect(200);
  });

});
});