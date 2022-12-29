import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PostingService } from './posting.service';
import { Posting } from './entities/posting.entity';
import { UpdatePostingDto } from './dto/update-posting.dto';
import { CreatePostingDto } from './dto/create-posting.dto';

@Controller('posting')
export class PostingController {
    constructor(private readonly postingService: PostingService){}

@Get() // 전체 게시글 불러오기
getAllPosting():Posting[] {
    return this.postingService.getAllPosting();
}

@Get("search:userName") // 게시글 검색하기
searchingPosting(@Param("userName") userName:string){
    return this.postingService.searchingPosting(userName);
}

@Get(":id") // 나의 게시글 확인하기 v number가 아니라 string
getMyPosting(@Param("id") postId:number):Posting{
    return this.postingService.getOnePosting(postId);
}


@Post() // 게시글 작성하기
createPosting(@Body() postingData: CreatePostingDto){
    return this.postingService.createPosting(postingData);
}

@Delete(":id") // 게시글 삭제하기
deletePosting(@Param('id') postId:number){
    return this.postingService.deleteOnePosting(postId);
}

@Patch(':id')
patch(@Param('id') postId:number, @Body() updatePostingData: UpdatePostingDto) {
    return  this.postingService.update(postId, updatePostingData);
    }
}

// todo : 댓글 && 대댓글 쿼리는 완성 후에

