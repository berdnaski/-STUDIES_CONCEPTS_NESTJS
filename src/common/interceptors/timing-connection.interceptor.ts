/* eslint-disable @typescript-eslint/require-await */
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const startTime = Date.now();
    console.log('TimingConnectionInterceptor executado. ANTES');

    return next.handle().pipe(
      tap(() => {
        const finalTime = Date.now();
        const elapsedTime = finalTime - startTime;
        console.log(
          `TimingConnectionInterceptor: Levou ${elapsedTime}ms para executar.`,
        );
      }),
    );
  }
}
