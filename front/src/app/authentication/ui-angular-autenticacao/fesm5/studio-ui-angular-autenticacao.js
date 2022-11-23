import { InjectionToken, Injectable, Inject, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { of, Subject, throwError, Observable, from } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { OAuthApplication } from '@betha-plataforma/oauth';
import { __assign } from 'tslib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var OAUTH_APPLICATION = new InjectionToken('OauthApplication');
var AutenticacaoContextService = /** @class */ (function () {
    function AutenticacaoContextService(oauthApplication) {
        var _this = this;
        this.oauthApplication = oauthApplication;
        this.getInformacaoUsuario = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var user = _this.oauthApplication.getUser();
            return of({
                celular: user.cellPhone,
                dataNascimento: user.birthDay,
                emails: {
                    primario: user.email,
                    secundario: user.secondaryEmail
                },
                foto: user.photo.split('?')[0].concat('?access_token=').concat(_this.getAccessToken()),
                id: user.id,
                nome: user.name
            });
        });
        this.getAccessToken = (/**
         * @return {?}
         */
        function () {
            if (_this.oauthApplication.hasActiveSession()) {
                /** @type {?} */
                var token = _this.oauthApplication.getSession().accessToken;
                return token ? token.access_token : undefined;
            }
            return undefined;
        });
    }
    /**
     * @return {?}
     */
    AutenticacaoContextService.prototype.logout = /**
     * @return {?}
     */
    function () {
        this.oauthApplication.logout();
    };
    /**
     * @return {?}
     */
    AutenticacaoContextService.prototype.refreshToken = /**
     * @return {?}
     */
    function () {
        return this.oauthApplication.silentRefresh();
    };
    AutenticacaoContextService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    AutenticacaoContextService.ctorParameters = function () { return [
        { type: OAuthApplication, decorators: [{ type: Inject, args: [OAUTH_APPLICATION,] }] }
    ]; };
    /** @nocollapse */ AutenticacaoContextService.ngInjectableDef = ɵɵdefineInjectable({ factory: function AutenticacaoContextService_Factory() { return new AutenticacaoContextService(ɵɵinject(OAUTH_APPLICATION)); }, token: AutenticacaoContextService, providedIn: "root" });
    return AutenticacaoContextService;
}());
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
var AutenticacaoRequestsInterceptor = /** @class */ (function () {
    function AutenticacaoRequestsInterceptor(authenticationContextService) {
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
    AutenticacaoRequestsInterceptor.prototype.intercept = /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        var _this = this;
        return next.handle(this.addAuthRequest(req)).pipe(catchError((/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            if ([401, 410].includes(err.status)) {
                return _this.refreshToken(req, next)
                    .pipe(switchMap((/**
                 * @return {?}
                 */
                function () {
                    return next.handle(_this.addAuthRequest(req));
                })), catchError((/**
                 * @param {?} err1
                 * @return {?}
                 */
                function (err1) {
                    _this.authenticationContextService.logout();
                    return throwError(err1);
                })));
            }
            return throwError(err);
        })));
    };
    /**
     * @private
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    AutenticacaoRequestsInterceptor.prototype.refreshToken = /**
     * @private
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        var _this = this;
        if (this.refreshTokenInProgress) {
            return new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            function (observer) {
                _this.tokenRefreshedSource$.subscribe((/**
                 * @return {?}
                 */
                function () {
                    observer.next();
                    observer.complete();
                }));
            }));
        }
        this.refreshTokenInProgress = true;
        return from(this.authenticationContextService.refreshToken()).pipe(tap((/**
         * @return {?}
         */
        function () {
            _this.refreshTokenInProgress = false;
            _this.tokenRefreshedSource.next();
        })), catchError((/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            _this.refreshTokenInProgress = false;
            _this.authenticationContextService.logout();
            return throwError(err);
        })));
    };
    /**
     * @private
     * @param {?} req
     * @return {?}
     */
    AutenticacaoRequestsInterceptor.prototype.addAuthRequest = /**
     * @private
     * @param {?} req
     * @return {?}
     */
    function (req) {
        return req.clone({
            setHeaders: {
                Authorization: "Bearer " + this.authenticationContextService.getAccessToken()
            },
        });
    };
    AutenticacaoRequestsInterceptor.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    AutenticacaoRequestsInterceptor.ctorParameters = function () { return [
        { type: AutenticacaoContextService }
    ]; };
    /** @nocollapse */ AutenticacaoRequestsInterceptor.ngInjectableDef = ɵɵdefineInjectable({ factory: function AutenticacaoRequestsInterceptor_Factory() { return new AutenticacaoRequestsInterceptor(ɵɵinject(AutenticacaoContextService)); }, token: AutenticacaoRequestsInterceptor, providedIn: "root" });
    return AutenticacaoRequestsInterceptor;
}());
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
var AutenticacaoModule = /** @class */ (function () {
    function AutenticacaoModule() {
    }
    AutenticacaoModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [
                        CommonModule
                    ],
                    providers: [{
                            provide: HTTP_INTERCEPTORS,
                            useClass: AutenticacaoRequestsInterceptor,
                            multi: true
                        }]
                },] }
    ];
    return AutenticacaoModule;
}());

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
var OAUTH_URL = window['___bth'].envs.suite.oauth.v1.host;
// tslint:disable-line
/** @type {?} */
var SERVICE_LOGIN_URL = window['___bth'].envs.suite['service-login'].v1.host;
// tslint:disable-line
/** @type {?} */
var USERS_URL = window['___bth'].envs.suite.usuarios.v1.host;
/**
 * @param {?} config
 * @return {?}
 */
function bethaOIDCProviderFactory(config) {
    /** @type {?} */
    var provider = {
        authorization_endpoint: OAUTH_URL + "/authorize",
        check_session_iframe: SERVICE_LOGIN_URL + "/openidsso.jsp",
        end_session_endpoint: SERVICE_LOGIN_URL + "/logout?continue=" + OAUTH_URL + "/authorize?client_id=" + config.clientId + "%26response_type=token%26redirect_uri=" + config.redirectUri + "%26scope=" + config.scope,
        //tslint:disable-line
        introspect_endpoint: OAUTH_URL + "/tokeninfo",
        token_endpoint: OAUTH_URL + "/token",
        userinfo_endpoint: USERS_URL + "/api/usuarios/@me"
    };
    return __assign({}, config, { provider: provider });
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
