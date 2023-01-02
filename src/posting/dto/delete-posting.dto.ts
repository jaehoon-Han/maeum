import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';

@InputType()
export class DeletePostingInput {
  @Field(() => Number)
  postingId: number;
}

@ObjectType()
export class DeletePostingOutput extends CoreOutput {}
