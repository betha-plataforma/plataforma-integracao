import { InjectionToken } from '@angular/core';
import { OAuthApplication } from '@betha-plataforma/oauth';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
export declare const OAUTH_APPLICATION: InjectionToken<OAuthApplication>;
export declare class AutenticacaoContextService {
    private oauthApplication;
    constructor(oauthApplication: OAuthApplication);
    logout(): void;
    refreshToken(): Promise<any>;
    readonly getInformacaoUsuario: () => Observable<Usuario>;
    readonly getAccessToken: () => string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AutenticacaoContextService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<AutenticacaoContextService>;
}

//# sourceMappingURL=autenticacao-context.service.d.ts.map