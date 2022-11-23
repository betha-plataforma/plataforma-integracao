/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError, from } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AutenticacaoContextService } from './autenticacao-context.service';
import * as i0 from "@angular/core";
import * as i1 from "./autenticacao-context.service";
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
    /** @nocollapse */ AutenticacaoRequestsInterceptor.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AutenticacaoRequestsInterceptor_Factory() { return new AutenticacaoRequestsInterceptor(i0.ɵɵinject(i1.AutenticacaoContextService)); }, token: AutenticacaoRequestsInterceptor, providedIn: "root" });
    return AutenticacaoRequestsInterceptor;
}());
export { AutenticacaoRequestsInterceptor };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0ZW50aWNhY2FvLXJlcXVlc3RzLmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN0dWRpby91aS1hbmd1bGFyLWF1dGVudGljYWNhby8iLCJzb3VyY2VzIjpbImxpYi9hdXRlbnRpY2FjYW8tcmVxdWVzdHMuaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7O0FBRTVFO0lBT0UseUNBQW9CLDRCQUF3RDtRQUF4RCxpQ0FBNEIsR0FBNUIsNEJBQTRCLENBQTRCO1FBSnBFLDJCQUFzQixHQUFHLEtBQUssQ0FBQztRQUMvQix5QkFBb0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3JDLDBCQUFxQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUVPLENBQUM7Ozs7OztJQUVqRixtREFBUzs7Ozs7SUFBVCxVQUFVLEdBQXFCLEVBQUUsSUFBaUI7UUFBbEQsaUJBa0JDO1FBaEJDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVU7Ozs7UUFBQyxVQUFDLEdBQXNCO1lBQ2xGLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDbkMsT0FBTyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7cUJBQ2hDLElBQUksQ0FDSCxTQUFTOzs7Z0JBQUM7b0JBQ1IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsQ0FBQyxFQUFDLEVBQ0YsVUFBVTs7OztnQkFBQyxVQUFBLElBQUk7b0JBQ2IsS0FBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUMzQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsQ0FBQyxFQUFDLENBQ0gsQ0FBQzthQUNMO1lBQ0QsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUVOLENBQUM7Ozs7Ozs7SUFFTyxzREFBWTs7Ozs7O0lBQXBCLFVBQXFCLEdBQXFCLEVBQUUsSUFBaUI7UUFBN0QsaUJBcUJDO1FBcEJDLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQy9CLE9BQU8sSUFBSSxVQUFVOzs7O1lBQUMsVUFBQSxRQUFRO2dCQUM1QixLQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUzs7O2dCQUFDO29CQUNuQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2hCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQyxFQUFDLENBQUM7WUFDTCxDQUFDLEVBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ2hFLEdBQUc7OztRQUFDO1lBQ0YsS0FBSSxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQztZQUNwQyxLQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkMsQ0FBQyxFQUFDLEVBQ0YsVUFBVTs7OztRQUFDLFVBQUMsR0FBRztZQUNiLEtBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7WUFDcEMsS0FBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzNDLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7Ozs7SUFFTyx3REFBYzs7Ozs7SUFBdEIsVUFBdUIsR0FBcUI7UUFDMUMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ2YsVUFBVSxFQUFFO2dCQUNWLGFBQWEsRUFBRSxZQUFVLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxjQUFjLEVBQUk7YUFDOUU7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDOztnQkExREYsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7OztnQkFGekIsMEJBQTBCOzs7MENBTG5DO0NBbUVDLEFBNURELElBNERDO1NBM0RZLCtCQUErQjs7Ozs7O0lBRTFDLGlFQUF1Qzs7Ozs7SUFDdkMsK0RBQTZDOzs7OztJQUM3QyxnRUFBeUU7Ozs7O0lBRTdELHVFQUFnRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBJbnRlcmNlcHRvciwgSHR0cFJlcXVlc3QsIEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCB0aHJvd0Vycm9yLCBmcm9tIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEF1dGVudGljYWNhb0NvbnRleHRTZXJ2aWNlIH0gZnJvbSAnLi9hdXRlbnRpY2FjYW8tY29udGV4dC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBdXRlbnRpY2FjYW9SZXF1ZXN0c0ludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcblxuICBwcml2YXRlIHJlZnJlc2hUb2tlbkluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgcHJpdmF0ZSB0b2tlblJlZnJlc2hlZFNvdXJjZSA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgdG9rZW5SZWZyZXNoZWRTb3VyY2UkID0gdGhpcy50b2tlblJlZnJlc2hlZFNvdXJjZS5hc09ic2VydmFibGUoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGhlbnRpY2F0aW9uQ29udGV4dFNlcnZpY2U6IEF1dGVudGljYWNhb0NvbnRleHRTZXJ2aWNlKSB7IH1cblxuICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcblxuICAgIHJldHVybiBuZXh0LmhhbmRsZSh0aGlzLmFkZEF1dGhSZXF1ZXN0KHJlcSkpLnBpcGUoY2F0Y2hFcnJvcigoZXJyOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKFs0MDEsIDQxMF0uaW5jbHVkZXMoZXJyLnN0YXR1cykpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcmVzaFRva2VuKHJlcSwgbmV4dClcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0LmhhbmRsZSh0aGlzLmFkZEF1dGhSZXF1ZXN0KHJlcSkpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKGVycjEgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uQ29udGV4dFNlcnZpY2UubG9nb3V0KCk7XG4gICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycjEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyKTtcbiAgICB9KSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaFRva2VuKHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpIHtcbiAgICBpZiAodGhpcy5yZWZyZXNoVG9rZW5JblByb2dyZXNzKSB7XG4gICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4ge1xuICAgICAgICB0aGlzLnRva2VuUmVmcmVzaGVkU291cmNlJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQoKTtcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLnJlZnJlc2hUb2tlbkluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgIHJldHVybiBmcm9tKHRoaXMuYXV0aGVudGljYXRpb25Db250ZXh0U2VydmljZS5yZWZyZXNoVG9rZW4oKSkucGlwZShcbiAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVmcmVzaFRva2VuSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRva2VuUmVmcmVzaGVkU291cmNlLm5leHQoKTtcbiAgICAgIH0pLFxuICAgICAgY2F0Y2hFcnJvcigoZXJyKSA9PiB7XG4gICAgICAgIHRoaXMucmVmcmVzaFRva2VuSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmF1dGhlbnRpY2F0aW9uQ29udGV4dFNlcnZpY2UubG9nb3V0KCk7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycik7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGFkZEF1dGhSZXF1ZXN0KHJlcTogSHR0cFJlcXVlc3Q8YW55Pikge1xuICAgIHJldHVybiByZXEuY2xvbmUoe1xuICAgICAgc2V0SGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy5hdXRoZW50aWNhdGlvbkNvbnRleHRTZXJ2aWNlLmdldEFjY2Vzc1Rva2VuKCl9YFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=