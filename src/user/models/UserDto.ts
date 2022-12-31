import { IsNotEmpty, ValidateIf } from "class-validator";

export class UserDto {
  @IsNotEmpty()
  @ValidateIf((obj, val) => val !== null)
  walletId:string;

  @ValidateIf((obj, val) => val > 0)
  balance:number;
}