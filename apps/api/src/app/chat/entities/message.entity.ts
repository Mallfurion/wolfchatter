import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "./chat.entity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content!: string;

    @Column()
    author!: string;

    @CreateDateColumn()
    timestamp!: Date;

    @ManyToOne(() => Chat, (chat: Chat) => chat.messages)
    public chat: Chat;
}