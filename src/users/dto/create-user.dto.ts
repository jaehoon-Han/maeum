import { IsString, IsNumber } from 'class-validator';

export class CreateUserDto {

    @IsString()
    readonly name: string;
    @IsString()
    readonly gender: string;
    @IsString()
    readonly password: string;
    @IsNumber()
    readonly age: number;
    @IsString({ each: true })
    readonly medicalHistory: string[];
}