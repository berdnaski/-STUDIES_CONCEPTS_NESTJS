import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  findAll() {
    return 'Essa rota retorna todos os recados';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Essa rota retorn o recado ${id}`;
  }

  @Post()
  create() {
    return `Essa rota cria um recado`;
  }
}
