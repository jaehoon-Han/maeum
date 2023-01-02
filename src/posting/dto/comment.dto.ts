import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Comment } from '../entities/comment.entity';

@InputType()
export class CommentInput extends PickType(Comment, ['contents']) {
  @Field(() => Number)
  postingId: number;
}

@ObjectType()
export class CommentOutput extends CoreOutput {}
