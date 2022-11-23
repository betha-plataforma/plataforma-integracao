import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacaoContextService } from './autenticacao-context.service';
import * as ɵngcc0 from '@angular/core';
export declare class AutenticacaoRequestsInterceptor implements HttpInterceptor {
    private authenticationContextService;
    private refreshTokenInProgress;
    private tokenRefreshedSource;
    private tokenRefreshedSource$;
    constructor(authenticationContextService: AutenticacaoContextService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    private refreshToken;
    private addAuthRequest;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AutenticacaoRequestsInterceptor, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<AutenticacaoRequestsInterceptor>;
}

//# sourceMappingURL=autenticacao-requests.interceptor.d.ts.map