import { ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';

@ObjectType()
export class DeleteUserOutput extends CoreOutput{}