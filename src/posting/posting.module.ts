import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostingController } from './posting.controller';
import { PostingService } from './posting.service';
import { Posting } from './entities/posting.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Posting])],
    exports: [TypeOrmModule],
    controllers: [PostingController],
    providers: [PostingService],
})
export class PostingModule {}
