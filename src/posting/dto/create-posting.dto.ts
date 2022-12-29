import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePostingDto {

    @IsString()
    readonly userName: string;

    @IsString()
    readonly content: string;

    @IsNumber()
    readonly createdAt: number;

}