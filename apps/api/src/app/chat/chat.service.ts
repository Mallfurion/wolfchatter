import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) { }

  async create(payload: CreateChatDto) {
    const newChat = await this.chatRepository.create(payload);
    await this.chatRepository.save(newChat);
    return newChat;
  }

  async findAll() {
    return await this.chatRepository.find();
  }

  async findOne(id: number) {
    const chat = await this.chatRepository.findOne(id);
    if (!chat) {
      throw new NotFoundException(`Chat with id: ${id} not found.`);
    }
    return chat;
  }

  async remove(id: number) {
    const deleteResult = await this.chatRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException(`Chat with id: ${id} not found.`);
    }
  }

  /**
   * Messages
   */

  async createMessage(payload: CreateMessageDto, chatId: number) {
    const chat = await this.chatRepository.findOne(chatId);
    if (!chat) {
      throw new NotFoundException(`Chat with id: ${chatId} not found.`);
    }
    const message = await this.messageRepository.create({
      author: payload.author,
      content: payload.content,
      chat: chat,
    });
    await this.messageRepository.save(message);
    return message;
  }

  async findAllMessages(chatId: number) {
    const chat = await this.chatRepository.findOne(chatId);
    if (!chat) {
      throw new NotFoundException(`Chat with id: ${chatId} not found.`);
    }
    return await this.messageRepository.find({
      chat: chat,
    });
  }
}
