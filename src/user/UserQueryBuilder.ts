import { Injectable } from "@nestjs/common";
import { userConstants } from "./constants/user.constants";

@Injectable()
export class UserQueryBuilder {
  private readonly dbName: string;
  constructor() {
    this.dbName = userConstants.tableName;
  }

  buildQueryGetByWalletId(walletId: string): string {
    return `SELECT * FROM public.${this.dbName} WHERE "walletId" = '${walletId}'`;
  }

  buildQueryGetAllUsers(): string {
    return `SELECT * FROM public.${this.dbName}`;
  }


  buildQueryUpdateBalance(balance: number, walletId: string): string {
    return `UPDATE public.${this.dbName} SET "balance"=${balance} WHERE "walletId"= '${walletId}'`;
  }
}