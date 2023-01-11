import { Injectable } from "@nestjs/common";
import { UserDto } from "./models/UserDto";
import { UserRepository } from "./UserRepository";
import { PaymentParamsDto } from "./models/PaymentParamsDto";
import { userConstants } from "./constants/user.constants";

@Injectable()
export class UserService {
  constructor(private readonly userRepository:UserRepository){}

  async getAllUsers(): Promise<UserDto[]>  {
    return await this.userRepository.getAllUsers();
  }

  async getUserByWalletId(walletId: string): Promise<UserDto> {
    return await this.userRepository.getUserByWalletId(walletId);
  }

  async loginUser(user: UserDto): Promise<UserDto> {
    const userByWalletId: UserDto = await this.getUserByWalletId(user.walletId);
    if (userByWalletId[0]) {
      return userByWalletId;
    }
    return await this.createUser(user);
  }

  private async createUser(user: UserDto): Promise<UserDto> {
    return await this.userRepository.createUser(user);
  }

  async updateBalance(user: UserDto): Promise<UserDto> {
    return await this.userRepository.updateBalance(user);
  }

  setPaymentParams(user: UserDto): PaymentParamsDto {
    //value will be taken from another endpoint
    const value = 0.05 * userConstants.coefficient;
    return {
      to:userConstants.caseWallet,
      from:user.walletId,
      value: value.toString(16)
    };
  }

}