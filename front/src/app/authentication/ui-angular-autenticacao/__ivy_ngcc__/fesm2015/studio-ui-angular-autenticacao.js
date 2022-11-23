import { InjectionToken, Injectable, Inject, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { of, Subject, throwError, Observable, from } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { OAuthApplication } from '@betha-plataforma/oauth';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@betha-plataforma/oauth';
const OAUTH_APPLICATION = new InjectionToken('OauthApplication');
class AutenticacaoContextService {
    /**
     * @param {?} oauthApplication
     */
    constructor(oauthApplication) {
        this.oauthApplication = oauthApplication;
        this.getInformacaoUsuario = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const user = this.oauthApplication.getUser();
            return of({
                celular: user.cellPhone,
                dataNascimento: user.birthDay,
                emails: {
                    primario: user.email,
                    secundario: user.secondaryEmail
                },
                foto: user.photo.split('?')[0].concat('?access_token=').concat(this.getAccessToken()),
                id: user.id,
                nome: user.name
            });
        });
        this.getAccessToken = (/**
         * @return {?}
         */
        () => {
            if (this.oauthApplication.hasActiveSession()) {
                /** @type {?} */
                const token = this.oauthApplication.getSession().accessToken;
                return token ? token.access_token : undefined;
            }
            return undefined;
        });
    }
    /**
     * @return {?}
     */
    logout() {
        this.oauthApplication.logout();
    }
    /**
     * @return {?}
     */
    refreshToken() {
        return this.oauthApplication.silentRefresh();
    }
}
AutenticacaoContextService.ɵfac = function AutenticacaoContextService_Factory(t) { return new (t || AutenticacaoContextService)(ɵngcc0.ɵɵinject(OAUTH_APPLICATION)); };
AutenticacaoContextService.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: AutenticacaoContextService, factory: AutenticacaoContextService.ɵfac, providedIn: 'root' });
/** @nocollapse */
AutenticacaoContextService.ctorParameters = () => [
    { type: OAuthApplication, decorators: [{ type: Inject, args: [OAUTH_APPLICATION,] }] }
];
/** @nocollapse */ AutenticacaoContextService.ngInjectableDef = ɵɵdefineInjectable({ factory: function AutenticacaoContextService_Factory() { return new AutenticacaoContextService(ɵɵinject(OAUTH_APPLICATION)); }, token: AutenticacaoContextService, providedIn: "root" });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AutenticacaoContextService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: ɵngcc1.OAuthApplication, decorators: [{
                type: Inject,
                args: [OAUTH_APPLICATION]
            }] }]; }, null); })();
if (false) {
    /** @type {?} */
    AutenticacaoContextService.prototype.getInformacaoUsuario;
    /** @type {?} */
    AutenticacaoContextService.prototype.getAccessToken;
    /**
     * @type {?}
     * @private
     */
    AutenticacaoContextService.prototype.oauthApplication;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AutenticacaoRequestsInterceptor {
    /**
     * @param {?} authenticationContextService
     */
    constructor(authenticationContextService) {
        this.authenticationContextService = authenticationContextService;
        this.refreshTokenInProgress = false;
        this.tokenRefreshedSource = new Subject();
        this.tokenRefreshedSource$ = this.tokenRefreshedSource.asObservable();
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        return next.handle(this.addAuthRequest(req)).pipe(catchError((/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            if ([401, 410].includes(err.status)) {
                return this.refreshToken(req, next)
                    .pipe(switchMap((/**
                 * @return {?}
                 */
                () => {
                    return next.handle(this.addAuthRequest(req));
                })), catchError((/**
                 * @param {?} err1
                 * @return {?}
                 */
                err1 => {
                    this.authenticationContextService.logout();
                    return throwError(err1);
                })));
            }
            return throwError(err);
        })));
    }
    /**
     * @private
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    refreshToken(req, next) {
        if (this.refreshTokenInProgress) {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            observer => {
                this.tokenRefreshedSource$.subscribe((/**
                 * @return {?}
                 */
                () => {
                    observer.next();
                    observer.complete();
                }));
            }));
        }
        this.refreshTokenInProgress = true;
        return from(this.authenticationContextService.refreshToken()).pipe(tap((/**
         * @return {?}
         */
        () => {
            this.refreshTokenInProgress = false;
            this.tokenRefreshedSource.next();
        })), catchError((/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            this.refreshTokenInProgress = false;
            this.authenticationContextService.logout();
            return throwError(err);
        })));
    }
    /**
     * @private
     * @param {?} req
     * @return {?}
     */
    addAuthRequest(req) {
        return req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authenticationContextService.getAccessToken()}`
            },
        });
    }
}
AutenticacaoRequestsInterceptor.ɵfac = function AutenticacaoRequestsInterceptor_Factory(t) { return new (t || AutenticacaoRequestsInterceptor)(ɵngcc0.ɵɵinject(AutenticacaoContextService)); };
AutenticacaoRequestsInterceptor.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: AutenticacaoRequestsInterceptor, factory: AutenticacaoRequestsInterceptor.ɵfac, providedIn: 'root' });
/** @nocollapse */
AutenticacaoRequestsInterceptor.ctorParameters = () => [
    { type: AutenticacaoContextService }
];
/** @nocollapse */ AutenticacaoRequestsInterceptor.ngInjectableDef = ɵɵdefineInjectable({ factory: function AutenticacaoRequestsInterceptor_Factory() { return new AutenticacaoRequestsInterceptor(ɵɵinject(AutenticacaoContextService)); }, token: AutenticacaoRequestsInterceptor, providedIn: "root" });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AutenticacaoRequestsInterceptor, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: AutenticacaoContextService }]; }, null); })();
if (false) {
    /**
     * @type {?}
     * @private
     */
    AutenticacaoRequestsInterceptor.prototype.refreshTokenInProgress;
    /**
     * @type {?}
     * @private
     */
    AutenticacaoRequestsInterceptor.prototype.tokenRefreshedSource;
    /**
     * @type {?}
     * @private
     */
    AutenticacaoRequestsInterceptor.prototype.tokenRefreshedSource$;
    /**
     * @type {?}
     * @private
     */
    AutenticacaoRequestsInterceptor.prototype.authenticationContextService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AutenticacaoModule {
}
AutenticacaoModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: AutenticacaoModule });
AutenticacaoModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function AutenticacaoModule_Factory(t) { return new (t || AutenticacaoModule)(); }, providers: [{
            provide: HTTP_INTERCEPTORS,
            useClass: AutenticacaoRequestsInterceptor,
            multi: true
        }], imports: [[
            CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(AutenticacaoModule, { imports: function () { return [CommonModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(AutenticacaoModule, [{
        type: NgModule,
        args: [{
                declarations: [],
                imports: [
                    CommonModule
                ],
                providers: [{
                        provide: HTTP_INTERCEPTORS,
                        useClass: AutenticacaoRequestsInterceptor,
                        multi: true
                    }]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function EmailsUsuario() { }
if (false) {
    /** @type {?} */
    EmailsUsuario.prototype.primario;
    /** @type {?} */
    EmailsUsuario.prototype.secundario;
}
/**
 * @record
 */
function Usuario() { }
if (false) {
    /** @type {?} */
    Usuario.prototype.id;
    /** @type {?} */
    Usuario.prototype.nome;
    /** @type {?|undefined} */
    Usuario.prototype.sexo;
    /** @type {?|undefined} */
    Usuario.prototype.celular;
    /** @type {?|undefined} */
    Usuario.prototype.dataNascimento;
    /** @type {?|undefined} */
    Usuario.prototype.dataCadastro;
    /** @type {?|undefined} */
    Usuario.prototype.foto;
    /** @type {?|undefined} */
    Usuario.prototype.emails;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const OAUTH_URL = window['___bth'].envs.suite.oauth.v1.host;
// tslint:disable-line
/** @type {?} */
const SERVICE_LOGIN_URL = window['___bth'].envs.suite['service-login'].v1.host;
// tslint:disable-line
/** @type {?} */
const USERS_URL = window['___bth'].envs.suite.usuarios.v1.host;
/**
 * @param {?} config
 * @return {?}
 */
function bethaOIDCProviderFactory(config) {
    /** @type {?} */
    const provider = {
        authorization_endpoint: `${OAUTH_URL}/authorize`,
        check_session_iframe: `${SERVICE_LOGIN_URL}/openidsso.jsp`,
        end_session_endpoint: `${SERVICE_LOGIN_URL}/logout?continue=${OAUTH_URL}/authorize?client_id=${config.clientId}%26response_type=token%26redirect_uri=${config.redirectUri}%26scope=${config.scope}`,
        //tslint:disable-line
        introspect_endpoint: `${OAUTH_URL}/tokeninfo`,
        token_endpoint: `${OAUTH_URL}/token`,
        userinfo_endpoint: `${USERS_URL}/api/usuarios/@me`
    };
    return Object.assign({}, config, { provider });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AutenticacaoContextService, AutenticacaoModule, OAUTH_APPLICATION, bethaOIDCProviderFactory, AutenticacaoRequestsInterceptor as ɵa };

//# sourceMappingURL=studio-ui-angular-autenticacao.js.map