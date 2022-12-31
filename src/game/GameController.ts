import { Body, Controller, Post, Get, Patch, Param } from "@nestjs/common";
import { GameInfoDto } from "./models/GameInfoDto";
import { GameService } from "./GameService";
import { PlayerDto } from "./models/PlayerDto";
import { GameDto } from "./models/GameDto";

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
  public updateGame(@Param('id') id:string, @Body() playerInfo: PlayerDto): Promise<GameDto> {
    return this.gameService.updateUsers(id, playerInfo) ;
  }
}