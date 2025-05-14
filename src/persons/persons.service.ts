/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import type { Repository } from 'typeorm';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    try {
      const personData = {
        name: createPersonDto.name,
        passwordHash: createPersonDto.password,
        email: createPersonDto.email,
      };

      const newPerson = this.personRepository.create(personData);
      await this.personRepository.save(newPerson);
      return {
        newPerson,
      };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('E-mail já está cadastrado.');
      }

      throw err;
    }
  }

  async findAll() {
    const persons = await this.personRepository.find({
      order: {
        id: 'desc',
      },
    });

    return {
      persons,
    };
  }

  async findOne(id: number) {
    const person = await this.personRepository.findOne({
      where: {
        id,
      },
    });

    if (!person) {
      throw new NotFoundException('Pessoa não encontrada.');
    }

    return {
      person,
    };
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  async remove(id: number) {
    const person = await this.personRepository.findOne({
      where: {
        id,
      },
    });

    if (!person) {
      throw new NotFoundException('Pessoa não encontrada');
    }

    return this.personRepository.remove(person);
  }
}
