import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostingsService } from './posting.service';
import { PostingsResolver} from './posting.resolver';
import { Posting } from './entities/posting.entity';
import { ReComment } from './entities/recomment.entity';
import { Comment } from './entities/comment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Posting, Comment, ReComment])],
    exports: [PostingsService],
    providers: [PostingsService, PostingsResolver],
})
export class PostingModule {}
