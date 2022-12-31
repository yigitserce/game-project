import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { UserModel } from "./user/UserModel";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmModuleOptions } from "./postgresql-config/TypeOrmModuleOptions";
import { GameModel } from "./game/GameModel";

@Module({
  imports: [
    UserModel,
    GameModel,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot(typeOrmModuleOptions),
  ],
})
export class AppModule {}
