import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Posting } from '../entities/Posting.entity';

@InputType()
export class CreatePostingInput extends PickType(Posting, [
  'title',
  'contents',
]) {}

@ObjectType()
export class CreatePostingOutput extends CoreOutput {}
