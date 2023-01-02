import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Posting } from '../entities/posting.entity';

@ObjectType()
export class GetMyPostingOutput extends CoreOutput {
  @Field(() => [Posting])
  posting?: Posting[];
}
