/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/require-await */
import {
  BadRequestException,
  type CallHandler,
  type ExecutionContext,
  type NestInterceptor,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

export class ErrorHandlingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log('ErrorHandlingInterceptor executado. ANTES');

    return next.handle().pipe(
      catchError(err => {
        return throwError(() => {
          if (err.name === 'NotFoundException') {
            return new BadRequestException(err.message);
          }

          return new BadRequestException('Ocorreu um erro desconhecido');
        });
      }),
    );
  }
}
