import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PlayerDto } from "../PlayerDto";

@Entity('game')
export class GameEntity {
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column("text")
  title:string;

  @Column("text")
  description:string;

  @Column("text",{ array: true })
  options:string[];

  @Column("double precision", { array: true })
  ratios:number[];

  @Column("text", { array: true })
  users:PlayerDto[];

  @Column("double precision")
  dynamic_ratio:number;

  @Column('double precision')
  ref_value:number;

  @Column('bigint', { nullable: true })
  time:number;
}