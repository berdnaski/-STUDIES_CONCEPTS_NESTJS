import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class AnotherMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (authorization) {
      req['user'] = {
        name: 'Erick',
        surname: 'Berdnaski',
      };
    }

    res.setHeader('X-Custom-Header', 'O valor do cabeçalho');

    next();
  }
}
