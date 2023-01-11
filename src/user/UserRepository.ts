import { Injectable } from "@nestjs/common";
import { UserDto } from "./models/UserDto";
import { UserEntity } from "./models/entity/UserEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserQueryBuilder } from "./UserQueryBuilder";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly typeOrmRepository: Repository<UserEntity>,
    private readonly userQueryBuilder: UserQueryBuilder
  ) {}

  async getAllUsers(): Promise<UserDto[]> {
    const query = this.userQueryBuilder.buildQueryGetAllUsers()
    return await this.typeOrmRepository.query(query);
  }

  async getUserByWalletId(walletId: string): Promise<UserDto> {
    const query = this.userQueryBuilder.buildQueryGetByWalletId(walletId);
    return await this.typeOrmRepository.query(query);
  }

  async updateBalance(user: UserDto): Promise<UserDto> {
    const query = this.userQueryBuilder.buildQueryUpdateBalance(user.balance, user.walletId);
    return await this.typeOrmRepository.query(query);
  }

  createUser(user: UserDto): Promise<UserDto> {
    return this.typeOrmRepository.save(user);
  }
}