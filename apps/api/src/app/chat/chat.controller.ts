import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }

  /**
   * Messages
   */

  @Get(':id/messages')
  getMessages(@Param('id') id: number) {
    return this.chatService.findAllMessages(id);
  }

  @Post(':id/messages')
  addMessage(@Body() createMessageDto: CreateMessageDto, @Param('id') id: number) {
    return this.chatService.createMessage(createMessageDto, id);
  }
}
