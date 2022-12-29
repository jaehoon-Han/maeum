import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { PostingController } from './posting/posting.controller';


@Module({
  imports: [UsersModule],
  controllers: [AppController, PostingController],
  providers: [],
})
export class AppModule {}
