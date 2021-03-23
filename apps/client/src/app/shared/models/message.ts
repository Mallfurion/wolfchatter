import { Chat } from "./chat";

export class ChatMessage {
    id: number;
    chat: Chat;
    author: string;
    content: string;
    timestamp: Date;
}