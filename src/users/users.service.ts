import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users: User[] = [];

    getAllUser(): User[] {
        return this.users;
        // 진짜 데이터베이스면 return에 Query가 와야한다.
    }

    getOneUser(id: number): User {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        }
        return user;
    }

    deleteOneUser(id: number) {
        this.getOneUser(id);
        this.users = this.users.filter(user => user.id !== id);
    }

    createUser(userData: CreateUserDto) {
        this.users.push({
            id: this.users.length + 1,
            ...userData,
        });


    }

    update(id: number, updateData: UpdateUserDto) {
        const user = this.getOneUser(id);
        this.deleteOneUser(id);
        this.users.push({ ...user, ...updateData });
    }
}


