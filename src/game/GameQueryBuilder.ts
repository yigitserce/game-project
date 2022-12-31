import { Injectable } from "@nestjs/common";
import { gameConstants } from "./constants/game.constants";
import { PlayerDto } from "./models/PlayerDto";

@Injectable()
export class GameQueryBuilder {
  private readonly dbName;
  constructor() {
    this.dbName = gameConstants.tableName;
  }

  buildGetAllGamesQuery(): string {
    return `SELECT * FROM public.${this.dbName}`;
  }

  buildGetByIdQuery(id: string): string {
    return `SELECT * FROM public.${this.dbName} WHERE id='${id}'`;
  }

  buildSetDynamicRatioQuery(id:string, dynamicRatio: number) {
    return `UPDATE public.${this.dbName} SET dynamic_ratio = ${dynamicRatio} WHERE id='${id}'`;
  }

  buildUpdateUsersQuery(id:string, users: PlayerDto[]) {
    let userQueryString = 'array[';
    users.forEach(user => userQueryString += `'{walletId:${user.walletId}, amount: ${user.amount}, option: ${user.option} }',`);
    userQueryString = userQueryString.substring(0, userQueryString.length - 1);
    userQueryString += ']';
    return `UPDATE public.${this.dbName} SET users = ${userQueryString} WHERE id='${id}'`;
  }

  buildUpdateRatiosQuery(id:string, ratios: number[]) {
    let userQueryString = 'array[';
    ratios.forEach(ratio => userQueryString += "" + ratio + ",");
    userQueryString = userQueryString.substring(0, userQueryString.length - 1);
    userQueryString += ']';
    return `UPDATE public.${this.dbName} SET ratios = ${userQueryString} WHERE id='${id}'`;
  }
}