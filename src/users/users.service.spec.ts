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
     service.createUser({
        name: '재훈이',
        gender: '남자',
        age: 29,
        password: 'wkdk',
      });
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getUserAll", () => {
    it("should return an array", () => {

      const result = service.getAllUser();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {
    it("should return a user", () => {
      service.createUser({
        name: '재훈이',
        gender: '남자',
        age: 29,
        password: 'wkdk',
      });
      const user = service.getOneUser(1);
      expect(user).toBeDefined();
    });

    it("should throw 404 error", () => {
      try {
        service.getOneUser(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('User with ID 999 not found.');
      }
    });
  });


  describe("deleteOne", () => {

    it("delete a user", () => {
      service.createUser({
        name: '재훈이',
        gender: '남자',
        age: 29,
        password: 'wkdk',
      });
      const beforeDelete = service.getAllUser().length;
      service.deleteOneUser(1)
      const afterDelete = service.getAllUser().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it("should return a 404", () => {
      try {
        service.deleteOneUser(999)
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", () => {
    it("should create a user", () => {
      const beforeCreate = service.getAllUser().length;
      service.createUser({
        name: '재훈이',
        gender: '남자',
        age: 29,
        password: 'wkdk',
      });
      const afterCreate = service.getAllUser().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update", () => {

    it("shuold update a user", () => {
      service.createUser({
        name: '재훈이',
        gender: '남자',
        age: 29,
        password: 'wkdk',
      });
      service.update(1, {name: '한재훈'});
      const user = service.getOneUser(1);
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


