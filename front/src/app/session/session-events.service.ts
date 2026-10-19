import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { AccessRestriction } from './session.model';

/**
 * Eventos de sessão emitidos pelo interceptor HTTP. Fica separado do SessionService para não criar
 * dependência circular (HttpClient -> interceptor -> SessionService -> HttpClient).
 */
@Injectable({
  providedIn: 'root'
})
export class SessionEventsService {

  private readonly restrictionSubject = new Subject<AccessRestriction>();

  readonly restriction$: Observable<AccessRestriction> = this.restrictionSubject.asObservable();

  notifyRestriction(restriction: AccessRestriction): void {
    this.restrictionSubject.next(restriction);
  }

  redirectToLogin(): void {
    window.location.assign('/login');
  }
}
