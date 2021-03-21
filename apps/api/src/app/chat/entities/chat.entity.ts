import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public lat: number;

  @Column()
  public lng: number;
}
