import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { GlobalExceptionFilter } from 'src/util/http-exception.filter';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { EditProfileInput, EditProfileOutput } from './dto/edit-profile.dto';
import { DeleteUserOutput } from './dto/delete-user.dto';
import { UserProfileOutput } from './dto/user-profile.dto';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>,
        private readonly jwtService: JwtService,
    

    ) {}

    async createUser({
        email,
        password,
        nickname,
      }: CreateUserInput): Promise<CreateUserOutput> {
        try {
          if (!email || !password || !nickname) {
            return {
              ok: false,
              message: '필수정보를 입력해주세요.',
            };
          }
          const userEmailInfo = await this.users.findOne({ where: { email } });
          const userNicknameInfo = await this.users.findOne({
            where: { nickname },
          });
    
          if (userEmailInfo) {
            return {
              ok: false,
              message: '중복된 이메일입니다.',
            };
          }
    
          if (userNicknameInfo) {
            return {
              ok: false,
              message: '중복된 닉네임입니다.',
            };
          }
          await this.users.save(this.users.create({ email, password, nickname }));
          return { ok: true, message: '회원가입에 성공했습니다.' };
        } catch (error) {
          throw new GlobalExceptionFilter();
        }
      }
    
      async login({ email, password }: LoginInput): Promise<LoginOutput> {
        try {
          const user = await this.users.findOne({
            where: { email },
            select: ['id', 'password'],
          });
          if (!user) {
            return {
              ok: false,
              message: '해당 이메일을 가진 사용자가 존재하지 않습니다.',
            };
          }
          const passwordCorrect = await user.checkPassword(password);
          if (!passwordCorrect) {
            return {
              ok: false,
              message: '비밀번호가 일치하지 않습니다.',
            };
          }
          const token = this.jwtService.sign(user.id);
          return {
            ok: true,
            token,
          };
        } catch (error) {
          throw new GlobalExceptionFilter();
        }
      }
    
      async findById(id: number): Promise<UserProfileOutput> {
        try {
          const user = await this.users.findOne({ where: { id } });
          if (user) {
            return {
              ok: true,
              user,
              message: '계정 조회에 성공했습니다.',
            };
          }
        } catch (error) {
          throw new GlobalExceptionFilter();
        }
      }
    
      async editProfile(
        userId: number,
        { email, password, nickname }: EditProfileInput,
      ): Promise<EditProfileOutput> {
        try {
          const user = await this.users.findOne({ where: { id: userId } });
          if (!user) {
            return {
              ok: false,
              message: '존재하지 않는 유저입니다.',
            };
          } else {
            const userEmailInfo = await this.users.findOne({ where: { email } });
            const userNicknameInfo = await this.users.findOne({
              where: { nickname },
            });
            if (email) {
              if (userEmailInfo && userEmailInfo.id !== userId) {
                return {
                  ok: false,
                  message: '중복된 이메일입니다.',
                };
              }
              user.email = email;
            }
            if (password) {
              user.password = password;
            }
            if (nickname) {
              if (userNicknameInfo && userNicknameInfo.id !== userId) {
                return {
                  ok: false,
                  message: '중복된 닉네임입니다.',
                };
              }
              user.nickname = nickname;
            }
            await this.users.save(user);
            return {
              ok: true,
              message: '프로필 수정에 성공했습니다.',
            };
          }
        } catch (error) {
          throw new GlobalExceptionFilter();
        }
      }
    
      async deleteUser(userId: number): Promise<DeleteUserOutput> {
        try {
          const user = await this.users.findOne({ where: { id: userId } });
          if (!user) {
            return {
              ok: false,
              message: '존재하지 않는 계정입니다.',
            };
          } else {
            await this.users.delete({ id: userId });
            return {
              ok: true,
              message: '계정 삭제에 성공했습니다.',
            };
          }
        } catch (error) {
          throw new GlobalExceptionFilter();
        }
      }
    
}


