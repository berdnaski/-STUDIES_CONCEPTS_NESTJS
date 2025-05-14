import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}
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

  async findAll() {
    const messages = await this.messageRepository.find();

    return {
      messages,
    };
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where: {
        id,
      },
    });

    if (message) return message;

    throw new NotFoundException('Recado não encontrado');
  }

  async create(createMessageDto: CreateMessageDto) {
    const newMessage = {
      ...createMessageDto,
      read: false,
      date: new Date(),
    };

    const message = this.messageRepository.create(newMessage);

    return await this.messageRepository.save(message);
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const partialUpdateMessage = {
      read: updateMessageDto?.read,
      text: updateMessageDto?.text,
    };
    const message = await this.messageRepository.preload({
      id,
      ...partialUpdateMessage,
    });

    if (!message) {
      throw new NotFoundException();
    }

    await this.messageRepository.save(message);

    return message;
  }

  async remove(id: number) {
    const message = await this.messageRepository.findOne({
      where: {
        id,
      },
    });

    if (!message) {
      throw new NotFoundException();
    }

    return this.messageRepository.remove(message);
  }
}
