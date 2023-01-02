import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [UsersService],
    providers: [UsersService, UsersResolver],
})
export class UsersModule {}
