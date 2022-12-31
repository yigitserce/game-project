import { Module } from '@nestjs/common';
import { UserController } from "./UserController";
import { UserService } from "./UserService";
import { UserRepository } from "./UserRepository";
import { UserQueryBuilder } from "./UserQueryBuilder";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./models/entity/UserEntity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserQueryBuilder],
})
export class UserModel {}