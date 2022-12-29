import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {

    @IsString()
    readonly name: string;

    @IsString()
    readonly gender: string;

    @IsString()
    readonly password: string;

    @IsNumber()
    readonly age: number;

}