(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/common/http'), require('rxjs'), require('rxjs/operators'), require('@betha-plataforma/oauth')) :
    typeof define === 'function' && define.amd ? define('@studio/ui-angular-autenticacao', ['exports', '@angular/core', '@angular/common', '@angular/common/http', 'rxjs', 'rxjs/operators', '@betha-plataforma/oauth'], factory) :
    (global = global || self, factory((global.studio = global.studio || {}, global.studio['ui-angular-autenticacao'] = {}), global.ng.core, global.ng.common, global.ng.common.http, global.rxjs, global.rxjs.operators, global.oauth));
}(this, function (exports, core, common, http, rxjs, operators, oauth) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var OAUTH_APPLICATION = new core.InjectionToken('OauthApplication');
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
                return rxjs.of({
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
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        AutenticacaoContextService.ctorParameters = function () { return [
            { type: oauth.OAuthApplication, decorators: [{ type: core.Inject, args: [OAUTH_APPLICATION,] }] }
        ]; };
        /** @nocollapse */ AutenticacaoContextService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function AutenticacaoContextService_Factory() { return new AutenticacaoContextService(core.ɵɵinject(OAUTH_APPLICATION)); }, token: AutenticacaoContextService, providedIn: "root" });
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
            this.tokenRefreshedSource = new rxjs.Subject();
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
            return next.handle(this.addAuthRequest(req)).pipe(operators.catchError((/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                if ([401, 410].includes(err.status)) {
                    return _this.refreshToken(req, next)
                        .pipe(operators.switchMap((/**
                     * @return {?}
                     */
                    function () {
                        return next.handle(_this.addAuthRequest(req));
                    })), operators.catchError((/**
                     * @param {?} err1
                     * @return {?}
                     */
                    function (err1) {
                        _this.authenticationContextService.logout();
                        return rxjs.throwError(err1);
                    })));
                }
                return rxjs.throwError(err);
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
                return new rxjs.Observable((/**
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
            return rxjs.from(this.authenticationContextService.refreshToken()).pipe(operators.tap((/**
             * @return {?}
             */
            function () {
                _this.refreshTokenInProgress = false;
                _this.tokenRefreshedSource.next();
            })), operators.catchError((/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                _this.refreshTokenInProgress = false;
                _this.authenticationContextService.logout();
                return rxjs.throwError(err);
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
            { type: core.Injectable, args: [{ providedIn: 'root' },] }
        ];
        /** @nocollapse */
        AutenticacaoRequestsInterceptor.ctorParameters = function () { return [
            { type: AutenticacaoContextService }
        ]; };
        /** @nocollapse */ AutenticacaoRequestsInterceptor.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function AutenticacaoRequestsInterceptor_Factory() { return new AutenticacaoRequestsInterceptor(core.ɵɵinject(AutenticacaoContextService)); }, token: AutenticacaoRequestsInterceptor, providedIn: "root" });
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
            { type: core.NgModule, args: [{
                        declarations: [],
                        imports: [
                            common.CommonModule
                        ],
                        providers: [{
                                provide: http.HTTP_INTERCEPTORS,
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

    exports.AutenticacaoContextService = AutenticacaoContextService;
    exports.AutenticacaoModule = AutenticacaoModule;
    exports.OAUTH_APPLICATION = OAUTH_APPLICATION;
    exports.bethaOIDCProviderFactory = bethaOIDCProviderFactory;
    exports.ɵa = AutenticacaoRequestsInterceptor;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=studio-ui-angular-autenticacao.umd.js.map
