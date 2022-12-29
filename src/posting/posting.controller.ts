import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('posting')
export class PostingController {

@Get() // 전체 게시글 불러오기
getPostingAll(){
    return 'this will return all posting';
}

@Get() // 나의 게시글 확인하기
getMyPosting(){
    return 'this will return my posting';
}

@Get() // 게시글 검색하기
getSearchingPosting(){
    return 'this will return specific posts'
}

@Post() // 게시글 작성하기
postPosting(){
    return 'this will return posting'
}

@Delete() // 게시글 삭제하기
deletePosting(){
    return 'this will delete posting'
}

}
