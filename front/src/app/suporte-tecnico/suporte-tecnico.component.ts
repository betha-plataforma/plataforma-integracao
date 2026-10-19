import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

import { SessionService } from '../session/session.service';

/**
 * Consulta de suporte, somente leitura: lista quem possui acesso ao contexto atual. Disponível apenas para
 * acessos técnicos ou administradores; não concede, altera nem remove acessos.
 */
@Component({
  selector: 'app-suporte-tecnico',
  templateUrl: './suporte-tecnico.component.html'
})
export class SuporteTecnicoComponent implements OnInit, OnDestroy {

  public acessos = [];
  public loading = true;
  public error: string;

  private contextSubscription: Subscription;

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  ngOnInit() {
    // Ao trocar para uma entidade sem acesso técnico, o AppComponent tira o usuário desta rota; não consultar.
    this.contextSubscription = this.sessionService.session$.pipe(
      filter(session => !!session && !!session.selectedContext && this.sessionService.hasSupportAccess()),
      map(session => session.selectedContext.accessId),
      distinctUntilChanged()
    ).subscribe(() => this.getData());
  }

  ngOnDestroy() {
    this.contextSubscription.unsubscribe();
  }

  getData(): void {
    this.loading = true;
    this.error = null;

    this.httpClient.get<any>('/api/support/accesses').toPromise()
      .then(payload => {
        this.acessos = Array.isArray(payload) ? payload : payload.content || payload.items || payload.data || [];
      })
      .catch(error => {
        this.error = error.error && error.error.message || 'Não foi possível consultar os acessos do contexto.';
      })
      .finally(() => this.loading = false);
  }

  usuario(acesso): string {
    return acesso.user && (acesso.user.name || acesso.user.id || acesso.user.login)
      || acesso.user || acesso.username || '-';
  }
}
