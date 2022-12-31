import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  walletId:string;

  @Column({ default: 0 })
  balance:number;
}