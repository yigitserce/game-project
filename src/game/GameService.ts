import { Injectable } from "@nestjs/common";
import { GameInfoDto } from "./models/GameInfoDto";
import { GameRepository } from "./GameRepository";
import { GameDto } from "./models/GameDto";
import { gameConstants } from "./constants/game.constants";
import { PlayerDto } from "./models/PlayerDto";
import { WinnersDto } from "./models/WinnersDto";

@Injectable()
export class GameService {
  constructor(private readonly gameRepository: GameRepository) {}

  async createGame(gameInfo: GameInfoDto): Promise<GameDto> {
    const ratioValues = this.calculateRatios(gameInfo.options, gameInfo.refValue);
    const game: GameDto = {
      title:gameInfo.title,
      description:gameInfo.description,
      options:gameInfo.options,
      ratios:await ratioValues,
      users:[],
      dynamic_ratio:1.6,
      ref_value:gameInfo.refValue,
      time:gameInfo.time
    };
    return await this.gameRepository.createGame(game);
  }

  private async calculateRatios(options: string[], refValue:number, id?: string): Promise<number[]> {
    const ratios = [];
    const game = id ? await this.gameRepository.getById(id): null;
    const dynamicRatio = game ? game[0].dynamic_ratio : gameConstants.dynamicRatio;
    options.forEach((opt) => {
      const option = opt.split('-');
      const average = (parseInt(option[0]) + parseInt(option[1])) / 2;
      const distance = Math.abs(average - refValue);
      const percentage = (distance / refValue) * 100;
      const ratio = (100 / (100 - percentage)) * parseFloat(dynamicRatio);
      ratios.push(ratio);
    });

    return ratios;
  }

  private async analyzeDynamicRatio(id: string) {
    const game = await this.gameRepository.getById(id);
    const numberOfPlayer = parseInt(game[0].users.length);
    const dynamicRatio = parseFloat(game[0].dynamic_ratio) - (parseFloat(game[0].dynamic_ratio) * Math.log(numberOfPlayer) / (numberOfPlayer * 100));
    await this.setDynamicRatio(id, dynamicRatio);
    await this.setRatios(id, game[0].options, game[0].ref_value);
  }

  private async setDynamicRatio(id:string, dynamicRatio:number) {
    await this.gameRepository.setDynamicRatio(id, dynamicRatio);
  }

  private async setRatios(id:string, options: string[], refValue:number) {
    const ratios = await this.calculateRatios(options,refValue,id);
    await this.gameRepository.updateRatios(id, ratios);
  }

  async getAllGames(): Promise<GameInfoDto[]> {
    return await this.gameRepository.getAllGames();
  }

  async updateUsers(id: string, playerInfo: PlayerDto): Promise<GameDto> {
    const updatedGame = await this.gameRepository.updateUsers(id, playerInfo);
    await this.analyzeDynamicRatio(id);
    return updatedGame;
  }

  async deleteGame(id: string): Promise<GameDto> {
    return await this.gameRepository.deleteGame(id);
  }


  private jsonParser (str: string, indexFirst:number) {
    return str[0].slice(1,-1).split(',')[indexFirst].split(':')[1];
  }

  async getWinners(): Promise<WinnersDto[]> {
    const games = await this.gameRepository.getAllGames();
    games.forEach(game => {
      console.log(this.jsonParser(game['users'], 2));
    });
    return [] as WinnersDto[];
  }
}