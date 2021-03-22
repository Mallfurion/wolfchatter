export class Api {
  constructor(public baseUrl: string) {}

  get chats() { return `${this.baseUrl}chats/` }
  chat(id) { return `${this.chats}${id}/` }

  messages(chatId: number) { return `${this.chat(chatId)}messages` }
}