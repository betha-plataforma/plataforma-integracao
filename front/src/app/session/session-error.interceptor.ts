import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionEventsService } from './session-events.service';

const UPSTREAM_ERROR_CODES = ['BETHA_UPSTREAM_UNAUTHORIZED', 'BETHA_REQUEST_DENIED'];

/**
 * Trata respostas do backend que dizem respeito à sessão com a Plataforma Betha:
 * 401 (sessão local inexistente ou expirada) inicia um novo login; 403 (restrição de acesso, termo
 * pendente, timeout, desconexão administrativa, login concorrente, sem permissão) bloqueia a aplicação.
 */
@Injectable()
export class SessionErrorInterceptor implements HttpInterceptor {

  constructor(private sessionEvents: SessionEventsService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handle(request, error);
        return throwError(error);
      })
    );
  }

  private handle(request: HttpRequest<any>, error: HttpErrorResponse): void {
    console.error('[Integração Betha] Falha na requisição ao backend', {
      method: request.method,
      url: request.url,
      status: error.status,
      response: error.error
    });

    const code = error.error && error.error.code;
    if (error.status === 401 && !UPSTREAM_ERROR_CODES.includes(code)) {
      this.sessionEvents.redirectToLogin();
    } else if (error.status === 403) {
      const restriction = error.error && typeof error.error === 'object'
        ? error.error
        : { code: 'ACCESS_DENIED', message: 'A Plataforma Betha negou o acesso.' };
      this.sessionEvents.notifyRestriction({ ...restriction, httpStatus: error.status });
    }
  }
}
