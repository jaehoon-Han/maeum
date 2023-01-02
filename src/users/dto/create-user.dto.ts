import { IsString, IsNumber, IsOptional } from 'class-validator';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from 'src/common/dto/output.dto';


@InputType()
export class CreateUserInput extends PickType(User, [
    'email',
    'password',
    'nickname',
]) {}

@ObjectType()
export class CreateUserOutput extends CoreOutput {}
