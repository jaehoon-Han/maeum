import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { GlobalExceptionFilter } from 'src/util/http-exception.filter';
import { Repository } from 'typeorm';
import { GetAllPostingOutput } from './dto/get-all-posting.dto';
import { CommentInput, CommentOutput } from './dto/comment.dto';
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
import { Comment } from './entities/comment.entity';
import { ReComment } from './entities/recomment.entity';

@Injectable()
export class PostingsService {
  constructor(
    @InjectRepository(Posting)
    private readonly Postings: Repository<Posting>,
    @InjectRepository(Comment)
    private readonly Comments: Repository<Comment>,
    @InjectRepository(ReComment)
    private readonly ReComments: Repository<ReComment>,
  ) {}

  async createPosting(
    authUser: User,
    createPostingInput: CreatePostingInput,
  ): Promise<CreatePostingOutput> {
    try {
      
      const title = createPostingInput.title.replace(/ /g, '');
      const contents = createPostingInput.contents.replace(/ /g, '');
      if (!title || !contents) {
        return {
          ok: false,
          message: '제목과 내용을 입력해주세요.',
        };
      }

      // 특수문자 제외, 정규식 통과
      const titleRegex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/;
      if (!titleRegex.test(title)) {
        return {
          ok: false,
          message: '특수문자를 제외한 문자만 입력해주세요.',
        };
      }
      const newPosting = this.Postings.create(createPostingInput);
      newPosting.user = authUser;
      await this.Postings.save(newPosting);
      return {
        ok: true,
        message: '게시글이 성공적으로 작성되었습니다.',
      };
    } catch (error) {
      throw new GlobalExceptionFilter();
    }
  }

  async getAllPosting(): Promise<GetAllPostingOutput> {
    try {
      const posting = await this.Postings.find();
      if (!posting) {
        return {
          ok: false,
          message: '게시글이 존재하지 않습니다.',
        };
      }
      return {
        ok: true,
        message: '게시글 조회에 성공했습니다.',
        result: posting,
      };
    } catch (error) {
      throw new GlobalExceptionFilter();
    }
  }

  async deletePosting(
    authUser: User,
    { postingId }: DeletePostingInput,
  ): Promise<DeletePostingOutput> {
    try {
      const posting = await this.Postings.findOne({
        where: { id: postingId },
      });
      if (!posting) {
        return {
          ok: false,
          message: '게시글이 존재하지 않습니다.',
        };
      }
      if (authUser.id !== posting.userId) {
        return {
          ok: false,
          message: '게시글을 삭제할 권한이 없습니다.',
        };
      }
      await this.Postings.delete(postingId);
      return {
        ok: true,
        message: '게시글이 성공적으로 삭제되었습니다.',
      };
    } catch (error) {
      throw new GlobalExceptionFilter();
    }
  }

  async getMyPosting(authUser: User): Promise<GetMyPostingOutput> {
    try {
      const posting = await this.Postings.find();

      // get My Posting 내가 작성한 게시글
      const getMyPosting = posting.filter((posting) => {
        return posting.userId === authUser.id;
      });
      if (!getMyPosting) {
        return {
          ok: false,
          message: '내 게시글이 존재하지 않습니다.',
        };
      }
      return {
        ok: true,
        message: '내 게시글 조회에 성공했습니다.',
        posting: getMyPosting,
      };
    } catch (error) {
      throw new GlobalExceptionFilter();
    }
  }

  async searchPosting({
    title,
  }: SearchPostingInput): Promise<SearchPostingOutput> {
    try {
      if (!title) {
        return {
          ok: false,
          message: '게시글 검색어를 입력해주세요.',
        };
      }
      const searchReplace = title.replace(/ /gi, '');
      const posting = await this.Postings.find();

      // search Posting 내가 작성한 게시글
      const searchPosting = posting.filter((posting) => {
        const dbTtile = posting.title.replace(/ /gi, '');
        return dbTtile.includes(searchReplace);
      });
      if (searchPosting.length === 0) {
        return {
          ok: false,
          message: '게시글 검색 결과가 존재하지 않습니다.',
        };
      }
      return {
        ok: true,
        message: '게시글 검색에 성공했습니다.',
        result: searchPosting,
      };
    } catch (error) {
      throw new GlobalExceptionFilter();
    }
  }

  async comment(
    authUser: User,
    { contents, postingId }: CommentInput,
  ): Promise<CommentOutput> {
    try {
      // Posting 게시글이 존재하는지 확인
      const posting = await this.Postings.findOne({
        where: { id: postingId },
      });
      if (!posting) {
        return {
          ok: false,
          message: '게시글이 존재하지 않습니다.',
        };
      }
      // new Comment 댓글 작성
      const contentsReplace = contents.replace(/ /g, '');
      if (!contentsReplace) {
        return {
          ok: false,
          message: '댓글을 작성해주세요.',
        };
      }
      const newComment = this.Comments.create({
        postingId,
        userId: authUser.id,
        contents,
      });
      newComment.posting = posting;
      newComment.user = authUser;
      await this.Comments.save(newComment);
      return {
        ok: true,
        message: '댓글을 작성했습니다.',
      };
    } catch (error) {
      throw new GlobalExceptionFilter();
    }
  }

  async recomment(
    authUser: User,
    { contents, commentsId }: ReCommentInput,
  ): Promise<ReCommentOutput> {
    try {
      // Comment 댓글이 존재하는지 확인
      const comment = await this.Comments.findOne({
        where: { id: commentsId },
      });
      if (!comment) {
        return {
          ok: false,
          message: '댓글이 존재하지 않습니다.',
        };
      }
      // new Recomment 대댓글 작성
      const contentsReplace = contents.replace(/ /g, '');
      if (!contentsReplace) {
        return {
          ok: false,
          message: '대댓글을 작성해주세요.',
        };
      }
      const newRecomment = this.ReComments.create({
        commentsId,
        userId: authUser.id,
        contents,
      });
      newRecomment.comments = comment;
      newRecomment.user = authUser;
      await this.ReComments.save(newRecomment);
      return {
        ok: true,
        message: '댓글에 대댓글을 작성했습니다.',
      };
    } catch (error) {
      throw new GlobalExceptionFilter();
    }
  }
}
