/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { OAuthApplication } from '@betha-plataforma/oauth';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
/** @type {?} */
export var OAUTH_APPLICATION = new InjectionToken('OauthApplication');
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
    /** @nocollapse */ AutenticacaoContextService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AutenticacaoContextService_Factory() { return new AutenticacaoContextService(i0.ɵɵinject(OAUTH_APPLICATION)); }, token: AutenticacaoContextService, providedIn: "root" });
    return AutenticacaoContextService;
}());
export { AutenticacaoContextService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0ZW50aWNhY2FvLWNvbnRleHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzdHVkaW8vdWktYW5ndWxhci1hdXRlbnRpY2FjYW8vIiwic291cmNlcyI6WyJsaWIvYXV0ZW50aWNhY2FvLWNvbnRleHQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTNELE9BQU8sRUFBRSxFQUFFLEVBQWMsTUFBTSxNQUFNLENBQUM7OztBQUV0QyxNQUFNLEtBQU8saUJBQWlCLEdBQXFDLElBQUksY0FBYyxDQUFDLGtCQUFrQixDQUFDO0FBRXpHO0lBS0Usb0NBQStDLGdCQUFrQztRQUFqRixpQkFDQztRQUQ4QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBV3hFLHlCQUFvQjs7O1FBQUc7O2dCQUN4QixJQUFJLEdBQVEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtZQUNqRCxPQUFPLEVBQUUsQ0FBQztnQkFDUixPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQ3ZCLGNBQWMsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDN0IsTUFBTSxFQUFFO29CQUNOLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDcEIsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjO2lCQUNoQztnQkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDckYsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUNYLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTthQUNoQixDQUFDLENBQUM7UUFDTCxDQUFDLEVBQUE7UUFFUSxtQkFBYzs7O1FBQUc7WUFDeEIsSUFBSSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTs7b0JBQ3RDLEtBQUssR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUMsV0FBVztnQkFDNUQsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQzthQUMvQztZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUMsRUFBQTtJQS9CRCxDQUFDOzs7O0lBRUQsMkNBQU07OztJQUFOO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2pDLENBQUM7Ozs7SUFFRCxpREFBWTs7O0lBQVo7UUFDRSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMvQyxDQUFDOztnQkFkRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQVJRLGdCQUFnQix1QkFXVixNQUFNLFNBQUMsaUJBQWlCOzs7cUNBWnZDO0NBOENDLEFBdkNELElBdUNDO1NBcENZLDBCQUEwQjs7O0lBYXJDLDBEQWFDOztJQUVELG9EQU1DOzs7OztJQWhDVyxzREFBcUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPQXV0aEFwcGxpY2F0aW9uIH0gZnJvbSAnQGJldGhhLXBsYXRhZm9ybWEvb2F1dGgnO1xuaW1wb3J0IHsgVXN1YXJpbyB9IGZyb20gJy4vdXN1YXJpbyc7XG5pbXBvcnQgeyBvZiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY29uc3QgT0FVVEhfQVBQTElDQVRJT046IEluamVjdGlvblRva2VuPE9BdXRoQXBwbGljYXRpb24+ID0gbmV3IEluamVjdGlvblRva2VuKCdPYXV0aEFwcGxpY2F0aW9uJyk7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEF1dGVudGljYWNhb0NvbnRleHRTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KE9BVVRIX0FQUExJQ0FUSU9OKSBwcml2YXRlIG9hdXRoQXBwbGljYXRpb246IE9BdXRoQXBwbGljYXRpb24pIHtcbiAgfVxuXG4gIGxvZ291dCgpIHtcbiAgICB0aGlzLm9hdXRoQXBwbGljYXRpb24ubG9nb3V0KCk7XG4gIH1cblxuICByZWZyZXNoVG9rZW4oKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5vYXV0aEFwcGxpY2F0aW9uLnNpbGVudFJlZnJlc2goKTtcbiAgfVxuXG4gIHJlYWRvbmx5IGdldEluZm9ybWFjYW9Vc3VhcmlvID0gKCk6IE9ic2VydmFibGU8VXN1YXJpbz4gPT4ge1xuICAgIGNvbnN0IHVzZXI6IGFueSA9IHRoaXMub2F1dGhBcHBsaWNhdGlvbi5nZXRVc2VyKCk7XG4gICAgcmV0dXJuIG9mKHtcbiAgICAgIGNlbHVsYXI6IHVzZXIuY2VsbFBob25lLFxuICAgICAgZGF0YU5hc2NpbWVudG86IHVzZXIuYmlydGhEYXksXG4gICAgICBlbWFpbHM6IHtcbiAgICAgICAgcHJpbWFyaW86IHVzZXIuZW1haWwsXG4gICAgICAgIHNlY3VuZGFyaW86IHVzZXIuc2Vjb25kYXJ5RW1haWxcbiAgICAgIH0sXG4gICAgICBmb3RvOiB1c2VyLnBob3RvLnNwbGl0KCc/JylbMF0uY29uY2F0KCc/YWNjZXNzX3Rva2VuPScpLmNvbmNhdCh0aGlzLmdldEFjY2Vzc1Rva2VuKCkpLFxuICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICBub21lOiB1c2VyLm5hbWVcbiAgICB9KTtcbiAgfVxuXG4gIHJlYWRvbmx5IGdldEFjY2Vzc1Rva2VuID0gKCk6IHN0cmluZyA9PiB7XG4gICAgaWYgKHRoaXMub2F1dGhBcHBsaWNhdGlvbi5oYXNBY3RpdmVTZXNzaW9uKCkpIHtcbiAgICAgIGNvbnN0IHRva2VuID0gdGhpcy5vYXV0aEFwcGxpY2F0aW9uLmdldFNlc3Npb24oKS5hY2Nlc3NUb2tlbjtcbiAgICAgIHJldHVybiB0b2tlbiA/IHRva2VuLmFjY2Vzc190b2tlbiA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG59XG4iXX0=