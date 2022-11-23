/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { OAuthApplication } from '@betha-plataforma/oauth';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
/** @type {?} */
export const OAUTH_APPLICATION = new InjectionToken('OauthApplication');
export class AutenticacaoContextService {
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
AutenticacaoContextService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AutenticacaoContextService.ctorParameters = () => [
    { type: OAuthApplication, decorators: [{ type: Inject, args: [OAUTH_APPLICATION,] }] }
];
/** @nocollapse */ AutenticacaoContextService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AutenticacaoContextService_Factory() { return new AutenticacaoContextService(i0.ɵɵinject(OAUTH_APPLICATION)); }, token: AutenticacaoContextService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0ZW50aWNhY2FvLWNvbnRleHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzdHVkaW8vdWktYW5ndWxhci1hdXRlbnRpY2FjYW8vIiwic291cmNlcyI6WyJsaWIvYXV0ZW50aWNhY2FvLWNvbnRleHQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTNELE9BQU8sRUFBRSxFQUFFLEVBQWMsTUFBTSxNQUFNLENBQUM7OztBQUV0QyxNQUFNLE9BQU8saUJBQWlCLEdBQXFDLElBQUksY0FBYyxDQUFDLGtCQUFrQixDQUFDO0FBS3pHLE1BQU0sT0FBTywwQkFBMEI7Ozs7SUFFckMsWUFBK0MsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFXeEUseUJBQW9COzs7UUFBRyxHQUF3QixFQUFFOztrQkFDbEQsSUFBSSxHQUFRLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7WUFDakQsT0FBTyxFQUFFLENBQUM7Z0JBQ1IsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUN2QixjQUFjLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQzdCLE1BQU0sRUFBRTtvQkFDTixRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0JBQ3BCLFVBQVUsRUFBRSxJQUFJLENBQUMsY0FBYztpQkFDaEM7Z0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3JGLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7YUFDaEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFBO1FBRVEsbUJBQWM7OztRQUFHLEdBQVcsRUFBRTtZQUNyQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFOztzQkFDdEMsS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxXQUFXO2dCQUM1RCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2FBQy9DO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQyxFQUFBO0lBL0JELENBQUM7Ozs7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2pDLENBQUM7Ozs7SUFFRCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDL0MsQ0FBQzs7O1lBZEYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBUlEsZ0JBQWdCLHVCQVdWLE1BQU0sU0FBQyxpQkFBaUI7Ozs7O0lBV3JDLDBEQWFDOztJQUVELG9EQU1DOzs7OztJQWhDVyxzREFBcUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPQXV0aEFwcGxpY2F0aW9uIH0gZnJvbSAnQGJldGhhLXBsYXRhZm9ybWEvb2F1dGgnO1xuaW1wb3J0IHsgVXN1YXJpbyB9IGZyb20gJy4vdXN1YXJpbyc7XG5pbXBvcnQgeyBvZiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY29uc3QgT0FVVEhfQVBQTElDQVRJT046IEluamVjdGlvblRva2VuPE9BdXRoQXBwbGljYXRpb24+ID0gbmV3IEluamVjdGlvblRva2VuKCdPYXV0aEFwcGxpY2F0aW9uJyk7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEF1dGVudGljYWNhb0NvbnRleHRTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KE9BVVRIX0FQUExJQ0FUSU9OKSBwcml2YXRlIG9hdXRoQXBwbGljYXRpb246IE9BdXRoQXBwbGljYXRpb24pIHtcbiAgfVxuXG4gIGxvZ291dCgpIHtcbiAgICB0aGlzLm9hdXRoQXBwbGljYXRpb24ubG9nb3V0KCk7XG4gIH1cblxuICByZWZyZXNoVG9rZW4oKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5vYXV0aEFwcGxpY2F0aW9uLnNpbGVudFJlZnJlc2goKTtcbiAgfVxuXG4gIHJlYWRvbmx5IGdldEluZm9ybWFjYW9Vc3VhcmlvID0gKCk6IE9ic2VydmFibGU8VXN1YXJpbz4gPT4ge1xuICAgIGNvbnN0IHVzZXI6IGFueSA9IHRoaXMub2F1dGhBcHBsaWNhdGlvbi5nZXRVc2VyKCk7XG4gICAgcmV0dXJuIG9mKHtcbiAgICAgIGNlbHVsYXI6IHVzZXIuY2VsbFBob25lLFxuICAgICAgZGF0YU5hc2NpbWVudG86IHVzZXIuYmlydGhEYXksXG4gICAgICBlbWFpbHM6IHtcbiAgICAgICAgcHJpbWFyaW86IHVzZXIuZW1haWwsXG4gICAgICAgIHNlY3VuZGFyaW86IHVzZXIuc2Vjb25kYXJ5RW1haWxcbiAgICAgIH0sXG4gICAgICBmb3RvOiB1c2VyLnBob3RvLnNwbGl0KCc/JylbMF0uY29uY2F0KCc/YWNjZXNzX3Rva2VuPScpLmNvbmNhdCh0aGlzLmdldEFjY2Vzc1Rva2VuKCkpLFxuICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICBub21lOiB1c2VyLm5hbWVcbiAgICB9KTtcbiAgfVxuXG4gIHJlYWRvbmx5IGdldEFjY2Vzc1Rva2VuID0gKCk6IHN0cmluZyA9PiB7XG4gICAgaWYgKHRoaXMub2F1dGhBcHBsaWNhdGlvbi5oYXNBY3RpdmVTZXNzaW9uKCkpIHtcbiAgICAgIGNvbnN0IHRva2VuID0gdGhpcy5vYXV0aEFwcGxpY2F0aW9uLmdldFNlc3Npb24oKS5hY2Nlc3NUb2tlbjtcbiAgICAgIHJldHVybiB0b2tlbiA/IHRva2VuLmFjY2Vzc190b2tlbiA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG59XG4iXX0=