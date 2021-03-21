import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'float' })
  public lat: number;

  @Column({ type: 'float' })
  public lng: number;
}
