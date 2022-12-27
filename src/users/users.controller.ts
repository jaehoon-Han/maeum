import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users')
export class UsersController {

        constructor(private readonly usersService: UsersService){}

    @Get()
    getAll(): User[] {
        return this.usersService.getAll();
    }

    @Get("/:id")
    getOne(@Param('id') userId: number):User {
        console.log(typeof userId);
        return this.usersService.getOne(userId);
    }

    @Post()
    create(@Body() userData: CreateUserDto) {
       return this.usersService.create(userData);
    }

    @Delete('/:id')
    remove(@Param('id') userId: number) {
        return this.usersService.deleteOne(userId);
    }

    @Patch('/:id')
    patc(@Param('id') userId: number, @Body() updateData) {
       return this.usersService.update(userId, updateData);
    }

}
