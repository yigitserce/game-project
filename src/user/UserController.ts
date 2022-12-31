import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserDto } from "./models/UserDto";
import { UserService } from "./UserService";
import { PaymentParamsDto } from "./models/PaymentParamsDto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  public async  getAllUsers(): Promise<UserDto[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':walletId')
  public async getUserByWalletId(@Param('walletId') walletId: string): Promise<UserDto> {
    const user: UserDto = await this.userService.getUserByWalletId(walletId);
    if (!user) {
      throw('Cannot Create User');
    }

    return user;
  }

  @Post('')
  public async loginUser(@Body() user:UserDto): Promise<UserDto> {
    return await this.userService.loginUser(user);
  }

  @Post('params')
  public setPaymentParams(@Body() user:UserDto): PaymentParamsDto {
    return this.userService.setPaymentParams(user);
  }
}