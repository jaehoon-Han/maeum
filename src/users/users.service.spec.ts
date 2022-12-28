import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
     service.create({
        name: '재훈이',
        gender: '남자',
        age: 29,
        password: 'wkdk',
        medicalHistory: ['두통', '치통']
      });
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("should return an array", () => {

      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {
    it("should return a user", () => {
      service.create({
        name: '재훈이',
        gender: '남자',
        age: 29,
        password: 'wkdk',
        medicalHistory: ['두통', '치통']
      });
      const user = service.getOne(1);
      expect(user).toBeDefined();
    });

    it("should throw 404 error", () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('User with ID 999 not found.');
      }
    });
  });


  describe("deleteOne", () => {

    it("delete a user", () => {
      service.create({
        name: '재훈이',
        gender: '남자',
        age: 29,
        password: 'wkdk',
        medicalHistory: ['두통', '치통']
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1)
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it("should return a 404", () => {
      try {
        service.deleteOne(999)
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", () => {
    it("should create a user", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        name: '재훈이',
        gender: '남자',
        age: 29,
        password: 'wkdk',
        medicalHistory: ['두통', '치통']
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update", () => {

    it("shuold update a user", () => {
      service.create({
        name: '재훈이',
        gender: '남자',
        age: 29,
        password: 'wkdk',
        medicalHistory: ['두통', '치통']
      });
      service.update(1, {name: '한재훈'});
      const user = service.getOne(1);
      expect(user.name).toEqual('한재훈');
    });
    it('shoul throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});


