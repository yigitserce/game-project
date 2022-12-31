import { PlayerDto } from "./PlayerDto";

export class GameDto {
  id?:string;
  title:string;
  description:string;
  options:string[];
  ratios:number[];
  users:PlayerDto[];
  dynamic_ratio:number;
  ref_value:number;
}