import { CreatePostingDto } from "./create-posting.dto";
import { PartialType } from '@nestjs/mapped-types';


export class UpdatePostingDto extends PartialType(CreatePostingDto){}