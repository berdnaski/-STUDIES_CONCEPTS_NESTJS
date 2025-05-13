import { Controller, Get } from '@nestjs/common';

@Controller('concepts-manual')
export class ConceptsManualController {
  @Get()
  home(): string {
    return 'concepts-manual';
  }
}
