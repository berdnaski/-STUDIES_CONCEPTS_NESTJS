/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
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
    return this.messages.find((item) => item.id === +id);
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

    if (messageExistsIndex >= 0) {
      const messageExists = this.messages[messageExistsIndex];
      this.messages[messageExistsIndex] = {
        ...messageExists,
        ...body,
      };
    }
  }

  remove(id: string) {
    const messageExistsIndex = this.messages.findIndex(
      (item) => item.id === +id,
    );

    if (messageExistsIndex >= 0) {
      this.messages.splice(messageExistsIndex, 1);
    }
  }
}
