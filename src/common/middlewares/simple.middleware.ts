import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('SImpleMiddleware:Olá');

    const authorization = req.headers.authorization;

    if (authorization) {
      req['user'] = {
        name: 'Erick',
        surname: 'Berdnaski',
      };
    }

    // if (!authorization) {
    //   throw new BadRequestException('Bla bla bla');
    // }

    res.setHeader('X-Custom-Header', 'O valor do cabeçalho');

    next();

    console.log('tchau');

    res.on('finish', () => {
      console.log('SIMPLES: Terminou');
    });
  }
}
