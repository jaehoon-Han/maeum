import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Posting } from './posting.entity';
import { ReComment } from './recomment.entity';

@InputType('CommentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Comment extends CoreEntity {
  @Column({ nullable: false })
  @Field(() => String)
  @IsString()
  contents: string;

  @Field(() => [User])
  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User;

  @RelationId((comment: Comment) => comment.user)
  userId: number;

  @Field(() => [Posting])
  @ManyToOne(() => Posting, (posting) => posting.comments, {
    onDelete: 'CASCADE',
  })
  posting: Posting;

  @RelationId((comment: Comment) => comment.posting)
  postingId: number;

  @Field(() => [ReComment])
  @OneToMany(() => ReComment, (recomment) => recomment.comments)
  recomments: ReComment[];
}
