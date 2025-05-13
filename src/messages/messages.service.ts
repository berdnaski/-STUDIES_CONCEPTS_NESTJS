/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import type { Message } from './entities/message.entity';

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

  findOne(id: string) {
    const message = this.messages.find((item) => item.id === +id);

    if (message) return message;

    throw new NotFoundException('Recado não encontrado');
  }

  create(body: any) {
    this.lastId++;
    const id = this.lastId;
    const newMessage = {
      id,
      ...body,
    };
    this.messages.push(newMessage);

    return newMessage;
  }

  update(id: string, body: any) {
    const messageExistsIndex = this.messages.findIndex(
      (item) => item.id === +id,
    );

    if (messageExistsIndex < 0) {
      throw new NotFoundException();
    }

    const messageExists = this.messages[messageExistsIndex];

    this.messages[messageExistsIndex] = {
      ...messageExists,
      ...body,
    };

    return this.messages[messageExistsIndex];
  }

  remove(id: string) {
    const messageExistsIndex = this.messages.findIndex(
      (item) => item.id === +id,
    );

    if (messageExistsIndex < 0) {
      throw new NotFoundException();
    }

    const message = this.messages[messageExistsIndex];

    this.messages.splice(messageExistsIndex, 1);

    return message;
  }
}
