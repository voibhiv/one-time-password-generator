/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    return next.handle().pipe(
      map((data) => {
        const statusCode = response.statusCode || 200;
        return {
          statusCode,
          message: response.locals?.message || '',
          data,
        };
      }),
      catchError((err) => {
        const statusCode = err.status || err.statusCode || 500;
        let message = err.message || 'Internal server error';
        let errorMessages = [];
        if (err.response?.message) {
          if (Array.isArray(err.response.message)) {
            errorMessages = err.response.message;
            message = errorMessages.join('; ');
          } else {
            message = err.response.message;
          }
        }
        return new Observable((subscriber) => {
          subscriber.next({
            message,
            statusCode,
            errorMessages: errorMessages.length > 1 ? errorMessages : undefined,
            data: null,
          });
          subscriber.complete();
        });
      }),
    );
  }
}
