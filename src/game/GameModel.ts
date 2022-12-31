import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameEntity } from "./models/entity/GameEntity";
import { GameController } from "./GameController";
import { GameService } from "./GameService";
import { GameRepository } from "./GameRepository";
import { GameQueryBuilder } from "./GameQueryBuilder";

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity])],
  controllers: [GameController],
  providers: [GameService, GameRepository, GameQueryBuilder],
})
export class GameModel {}