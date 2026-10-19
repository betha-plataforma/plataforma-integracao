import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { Session } from './session.model';

/**
 * Sessão do usuário com a Plataforma Betha, mantida pelo backend (BFF). As capabilities controlam apenas
 * a exibição de menus, rotas e botões: a autorização definitiva ocorre no backend em cada endpoint.
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly sessionSubject = new BehaviorSubject<Session>(null);

  readonly session$: Observable<Session> = this.sessionSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  current(): Session {
    return this.sessionSubject.getValue();
  }

  /**
   * Resolve quando houver um contexto selecionado e com o termo de responsabilidade aceito.
   */
  ready(): Promise<Session> {
    return this.session$.pipe(
      filter(session => !!session && !!session.selectedContext && session.selectedContext.accepted),
      take(1)
    ).toPromise();
  }

  load(): Promise<Session> {
    return this.httpClient.get<Session>('/api/session').toPromise()
      .then(session => this.publish(session));
  }

  selectContext(accessId: string, exercise?: string): Promise<Session> {
    return this.httpClient.post<Session>('/api/session/context', { accessId, exercise }).toPromise()
      .then(session => this.publish(session));
  }

  verify(): Promise<void> {
    return this.httpClient.get<void>('/api/session/verify').toPromise();
  }

  activity(): Promise<void> {
    return this.httpClient.post<void>('/api/session/activity', {}).toPromise();
  }

  getTerm(): Promise<any> {
    return this.httpClient.get<any>('/api/session/term').toPromise();
  }

  acceptTerm(): Promise<Session> {
    return this.httpClient.put<void>('/api/session/term/accept', {}).toPromise()
      .then(() => this.load());
  }

  logout(): Promise<void> {
    return this.httpClient.post<{ redirectUrl: string }>('/api/logout', {}).toPromise()
      .then(response => window.location.assign(response.redirectUrl));
  }

  can(funcionalidade: string, acao = 'read'): boolean {
    const session = this.current();
    const capabilities = session && session.capabilities && session.capabilities[funcionalidade];
    return !!(capabilities && capabilities[acao]);
  }

  hasSupportAccess(): boolean {
    const session = this.current();
    const selected = session && session.selectedContext;
    return !!(selected && (selected.technical || selected.admin));
  }

  private publish(session: Session): Session {
    this.sessionSubject.next(session);
    return session;
  }
}
