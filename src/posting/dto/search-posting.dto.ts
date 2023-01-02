import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Posting } from '../entities/Posting.entity';
import { GetAllPostingOutput } from './get-all-posting.dto';

@InputType()
export class SearchPostingInput extends PickType(Posting, ['title']) {}

@ObjectType()
export class SearchPostingOutput extends GetAllPostingOutput {}
