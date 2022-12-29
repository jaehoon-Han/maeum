import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {

        constructor(private usersService: UsersService){};

        // @Get()
        // findAll(): Promise<User[]> {
        //     return this.usersService.findAll();
        // }

        // @Get(':id')
        // findOne(@Param('id')id:number): Promise<User>{
        //     return this.usersService.findOne(id);
        // }

        // @Post()
        // create(@Body() user: User){
        //     return this.usersService.create(user);
        // }

        // @Delete(':id')
        // remote(@Param( 'id' )id: number){
        //     this.usersService.remove(id);
        // }



    @Get()
    getAllUser(): User[] {
        return this.usersService.getAllUser();
    }

    @Get("/:id")
    getOneUser(@Param('id') userId: number):User {
        return this.usersService.getOneUser(userId);
    }

    @Post()
    createUser(@Body() userData: CreateUserDto) {
       return this.usersService.createUser(userData);
    }

    @Delete('/:id')
    removeUser(@Param('id') userId: number) {
        return this.usersService.deleteOneUser(userId);
    }

    @Patch('/:id')
    patchUser(@Param('id') userId: number, @Body() updateData: UpdateUserDto) {
       return this.usersService.update(userId, updateData);
    }

}
