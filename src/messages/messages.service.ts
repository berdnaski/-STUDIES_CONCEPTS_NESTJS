import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, type DeepPartial } from 'typeorm';
import { PersonsService } from 'src/persons/persons.service';
import type { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly personService: PersonsService,
  ) {}
  // private lastId = 1;
  // private messages: Message[] = [
  //   {
  //     id: 1,
  //     text: 'Este é um recado de teste',
  //     from: 'Erick',
  //     to: ,
  //     read: false,
  //     date: new Date(),
  //   },
  // ];

  async findAll(paginationDto?: PaginationDto) {
    const limit = paginationDto?.limit ?? 10;
    const offset = paginationDto?.offset ?? 0;

    const messages = await this.messageRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });

    return {
      messages,
    };
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where: {
        id,
      },
      relations: ['from', 'to'],
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });

    if (message) return message;

    throw new NotFoundException('Recado não encontrado');
  }

  async create(createMessageDto: CreateMessageDto) {
    const { fromId, toId } = createMessageDto;

    const from = await this.personService.findOne(fromId);
    const to = await this.personService.findOne(toId);

    const newMessage: DeepPartial<Message> = {
      text: createMessageDto.text,
      from,
      to,
      read: false,
      date: new Date(),
    };

    const message = this.messageRepository.create(newMessage);

    await this.messageRepository.save(message);

    return {
      ...message,
      from: {
        id: message.from.id,
      },
      to: {
        id: message.to.id,
      },
    };
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const message = await this.findOne(id);

    message.text = updateMessageDto.text ?? message.text;
    message.read = updateMessageDto.read ?? message.read;

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
