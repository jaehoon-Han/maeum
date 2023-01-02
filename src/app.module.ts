import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { PostingModule } from './posting/posting.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Posting } from './posting/entities/posting.entity';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { JwtModule } from './jwt/jwt.module';
import { Comment } from './posting/entities/comment.entity';
import { ReComment } from './posting/entities/recomment.entity';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './util/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: `${process.env.DB_HOST}`,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User, Posting, Comment, ReComment],
  }),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: true,
    context: ({ req }) => ({ user: req['user'] }),
  }),
  JwtModule.forRoot({
    privateKey: process.env.PRIVATE_KEY,
  }),
  UsersModule,
  PostingModule,
  AuthModule,
  CommonModule,
  
],
controllers: [],
providers: [
  {
  provide: APP_FILTER,
  useClass: GlobalExceptionFilter,
},
],
})
  
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/graphql',
      method: RequestMethod.ALL,
    });
  }

}
