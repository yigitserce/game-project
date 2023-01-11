import { Body, Controller, Post, Get, Patch, Param, Delete } from "@nestjs/common";
import { GameInfoDto } from "./models/GameInfoDto";
import { GameService } from "./GameService";
import { PlayerDto } from "./models/PlayerDto";
import { GameDto } from "./models/GameDto";
import { WinnersDto } from "./models/WinnersDto";

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('')
  public async getAllGames(): Promise<GameInfoDto[]> {
    return await this.gameService.getAllGames();
  }

  @Post('')
  public async createGame(@Body() gameInfo:GameInfoDto): Promise<GameDto> {
    return await this.gameService.createGame(gameInfo);
  }

  @Patch(':id')
  public async updateGame(@Param('id') id:string, @Body() playerInfo: PlayerDto): Promise<GameDto> {
    return await this.gameService.updateUsers(id, playerInfo) ;
  }

  @Delete(':id')
  public async deleteGame(@Param('id') id:string):Promise<GameDto> {
    return await this.gameService.deleteGame(id);
  }

  @Get('winners')
  public async getWinners(): Promise<WinnersDto[]> {
    return await this.gameService.getWinners();
  }

}