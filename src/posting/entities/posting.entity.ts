import {Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Posting {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    userName:string;

    @Column()
    content:string;

    @Column()
    createdAt:number;
}