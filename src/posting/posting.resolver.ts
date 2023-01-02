import {
  CreatePostingInput,
  CreatePostingOutput,
} from './dto/create-posting.dto';
import {
  DeletePostingInput,
  DeletePostingOutput,
} from './dto/delete-posting.dto';
import { GetMyPostingOutput } from './dto/get-my-posting.dto';
import { ReCommentInput, ReCommentOutput } from './dto/recomment.dto';
import {
  SearchPostingInput,
  SearchPostingOutput,
} from './dto/search-posting.dto';
import { Posting } from './entities/posting.entity';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { PostingsService } from './posting.service';
import { GetAllPostingOutput } from './dto/get-all-posting.dto';
import { CommentInput, CommentOutput } from './dto/comment.dto';

@Resolver(() => Posting)
export class PostingsResolver {
  constructor(private readonly postingsService: PostingsService) { }

  // create Posting 게시글 생성
  @Mutation(() => CreatePostingOutput)
  async createPosting(
    @AuthUser() authUser: User,
    @Args('input') createPostingInput: CreatePostingInput,
  ): Promise<CreatePostingOutput> {
    return this.postingsService.createPosting(
      authUser,
      createPostingInput,
    );
  }

  // get All Posting 모든 게시글 조회
  @Query(() => GetAllPostingOutput)
  async getAllPosting(): Promise<GetAllPostingOutput> {
    return this.postingsService.getAllPosting();
  }

  // delete Posting 게시글 삭제
  @Mutation(() => DeletePostingOutput)
  async deletePosting(
    @AuthUser() authUser: User,
    @Args('input') deletePostingInput: DeletePostingInput,
  ): Promise<DeletePostingOutput> {
    return this.postingsService.deletePosting(
      authUser,
      deletePostingInput,
    );
  }

  // get My Posting 내 게시글 조회
  @Query(() => GetMyPostingOutput)
  async getMyPosting(@AuthUser() authUser: User): Promise<GetMyPostingOutput> {
    return this.postingsService.getMyPosting(authUser);
  }

  // search Posting 특정 게시글 검색
  @Query(() => SearchPostingOutput)
  async searchPosting(
    @Args('input') searchPostingInput: SearchPostingInput,
  ): Promise<SearchPostingOutput> {
    return this.postingsService.searchPosting(searchPostingInput);
  }

  // comment 댓글 생성
  @Mutation(() => CommentOutput)
  async comment(
    @AuthUser() authUser: User,
    @Args('input') commentInput: CommentInput,
  ): Promise<CommentOutput> {
    return this.postingsService.comment(authUser, commentInput);
  }

  // recomment 대댓글 생성
  @Mutation(() => ReCommentOutput)
  async recomment(
    @AuthUser() authUser: User,
    @Args('input') commentInput: ReCommentInput,
  ): Promise<ReCommentOutput> {
    return this.postingsService.recomment(authUser, commentInput);
  }
}
