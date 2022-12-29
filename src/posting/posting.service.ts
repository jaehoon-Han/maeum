import { Injectable, NotFoundException } from '@nestjs/common';
import { Posting } from './entities/posting.entity';
import { CreatePostingDto } from './dto/create-posting.dto';
import { UpdatePostingDto } from './dto/update-posting.dto';

@Injectable()
export class PostingService {
    private posting: Posting[] = [];

    getAllPosting(): Posting[] {
        return this.posting;
        // 진짜 데이터베이스면 return에 Query가 와야한다.
    }

    getOnePosting(id: number): Posting {
        const posting = this.posting.find(posting => posting.id === id);
        if (!posting) {
            throw new NotFoundException(`Posting with ID ${id} not found.`);
        }
        return posting;
    }

    searchingPosting(userName:string): Posting{
        const posting = this.posting.find(posting => posting.userName === userName);
        if (!userName) {
            throw new NotFoundException(`posting with userName ${userName} not found.`);
        }
        return posting;
    }

    deleteOnePosting(id: number) {
        this.getOnePosting(id);
        this.posting = this.posting.filter(posting => posting.id !== id);
    }

    createPosting(postingData: CreatePostingDto) {
        this.posting.push({
            id: this.posting.length + 1,
            ...postingData,
        });


    }

    update(id: number, updateData: UpdatePostingDto) {
        const posting = this.getOnePosting(id);
        this.deleteOnePosting(id);
        this.posting.push({ ...posting, ...updateData });
    }
}


