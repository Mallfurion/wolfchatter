import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message.entity";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'float' })
  public lat: number;

  @Column({ type: 'float' })
  public lng: number;

  @OneToMany(() => Message, (message: Message) => message.chat)
  public messages: Message[];
}
