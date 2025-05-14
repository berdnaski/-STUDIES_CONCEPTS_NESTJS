import { Injectable, NotFoundException } from '@nestjs/common';
import type { Message } from './entities/message.entity';
import type { CreateMessageDto } from './dto/create-message.dto';
import type { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  private lastId = 1;
  private messages: Message[] = [
    {
      id: 1,
      text: 'Este é um recado de teste',
      from: 'Erick',
      to: 'Eduarda',
      read: false,
      date: new Date(),
    },
  ];

  findAll() {
    return this.messages;
  }

  findOne(id: number) {
    const message = this.messages.find(item => item.id === id);

    if (message) return message;

    throw new NotFoundException('Recado não encontrado');
  }

  create(createMessageDto: CreateMessageDto) {
    this.lastId++;
    const id = this.lastId;
    const newMessage = {
      id,
      ...createMessageDto,
      read: false,
      date: new Date(),
    };
    this.messages.push(newMessage);

    return newMessage;
  }

  update(id: string, updateMessageDto: UpdateMessageDto) {
    const messageExistsIndex = this.messages.findIndex(item => item.id === +id);

    if (messageExistsIndex < 0) {
      throw new NotFoundException();
    }

    const messageExists = this.messages[messageExistsIndex];

    this.messages[messageExistsIndex] = {
      ...messageExists,
      ...updateMessageDto,
    };

    return this.messages[messageExistsIndex];
  }

  remove(id: number) {
    const messageExistsIndex = this.messages.findIndex(item => item.id === id);

    if (messageExistsIndex < 0) {
      throw new NotFoundException();
    }

    const message = this.messages[messageExistsIndex];

    this.messages.splice(messageExistsIndex, 1);

    return message;
  }
}
