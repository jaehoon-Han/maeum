import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Comment } from './comment.entity';

@InputType('PostingInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Posting extends CoreEntity {
  @Column({ nullable: false })
  @Field(() => String)
  @IsString()
  title: string;

  @Column({ nullable: false })
  @Field(() => String)
  @IsString()
  contents: string;

  @Field(() => [User])
  @ManyToOne(() => User, (user) => user.postings, { onDelete: 'CASCADE' })
  user: User;

  @RelationId((posting: Posting) => posting.user)
  userId: number;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.posting)
  comments: Comment[];
}
