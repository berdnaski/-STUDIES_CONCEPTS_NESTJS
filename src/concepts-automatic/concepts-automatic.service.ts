import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceptsAutomaticService {
  solucionaHome(): string {
    return 'Home do Conceitos automatic solucionada.';
  }
}
