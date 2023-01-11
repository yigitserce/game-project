import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { GameInfoDto } from "./models/GameInfoDto";
import { InjectRepository } from "@nestjs/typeorm";
import { GameEntity } from "./models/entity/GameEntity";
import { GameQueryBuilder } from "./GameQueryBuilder";
import { GameDto } from "./models/GameDto";
import { PlayerDto } from "./models/PlayerDto";
import { WinnersDto } from "./models/WinnersDto";

@Injectable()
export class GameRepository {
  constructor(
    @InjectRepository(GameEntity)
    private readonly typeOrmRepository: Repository<GameEntity>,
    private readonly gameQueryBuilder: GameQueryBuilder
  ) {}

  async createGame(game: GameDto): Promise<GameDto> {
    return await this.typeOrmRepository.save(game);
  }

  async getAllGames(): Promise<GameInfoDto[]> {
    const query = this.gameQueryBuilder.buildGetAllGamesQuery();
    return await this.typeOrmRepository.query(query);
  }

  async getById(id: string): Promise<GameDto> {
    const query = this.gameQueryBuilder.buildGetByIdQuery(id);
    return await this.typeOrmRepository.query(query);
  }

  async setDynamicRatio(id:string, dynamicRatio: number) {
    const query = this.gameQueryBuilder.buildSetDynamicRatioQuery(id, dynamicRatio);
    return await this.typeOrmRepository.query(query);
  }

  async updateUsers(id: string, playerInfo: PlayerDto): Promise<GameDto> {
    const game = await this.getById(id);
    const users: PlayerDto[] = game[0].users.map(user => {
      let userString = '{';
      const slicedUser = user.slice(1, user.length-1).split(',').map(e => e.split(':'));
      slicedUser.forEach((item) => {
        userString += `"${item[0].trim()}":"${item[1].trim()}",`;
      });
      userString = userString.substring(0, userString.length - 1);
      userString += '}';
      return JSON.parse(userString);
    });
    users.push(playerInfo);
    const query = this.gameQueryBuilder.buildUpdateUsersQuery(id, users);
    return await this.typeOrmRepository.query(query);
  }

  async updateRatios(id: string, ratio: number[]): Promise<GameDto> {
    const query = this.gameQueryBuilder.buildUpdateRatiosQuery(id, ratio);
    return await this.typeOrmRepository.query(query);
  }

  async deleteGame(id: string): Promise<GameDto> {
    const query = this.gameQueryBuilder.buildQueryDeleteGame(id);
    return await this.typeOrmRepository.query(query);
  }
}
