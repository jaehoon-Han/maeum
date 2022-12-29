import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { PostingModule } from './posting/posting.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Posting } from './posting/entities/posting.entity';

@Module({
  imports: [UsersModule, PostingModule,
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'yh.cpos3ccatavx.ap-northeast-2.rds.amazonaws.com',
    port: 4000,
    username: 'admin',
    password: 'gkswogns12',
    database: 'maeum2',
    entities: [User,Posting],
    synchronize: true,
  }),
  UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
