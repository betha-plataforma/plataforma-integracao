import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';

import { SessionService } from './session.service';

/**
 * Libera a rota conforme `data.capability` (permissão do page-mapping) ou `data.role === 'support'`
 * (acesso técnico ou administrador). É apenas feedback visual: o backend valida novamente.
 */
@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(private sessionService: SessionService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
    return this.sessionService.ready()
      .then(() => this.isAllowed(route.data) ? true : this.router.parseUrl('/sem-permissao'));
  }

  isAllowed(data: { [key: string]: any }): boolean {
    if (!data) {
      return true;
    }
    if (data.role === 'support') {
      return this.sessionService.hasSupportAccess();
    }
    if (data.capability) {
      return this.sessionService.can(data.capability);
    }
    return true;
  }
}
