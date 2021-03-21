import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(@InjectRepository(Chat) private chatRepository: Repository<Chat>) { }

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

  // update(id: number, updateChatDto: UpdateChatDto) {
  //   return `This action updates a #${id} chat`;
  // }

  async remove(id: number) {
    const deleteResult = await this.chatRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException(`Chat with id: ${id} not found.`);
    }
  }
}
