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
export class AutenticacaoRequestsInterceptor {
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
AutenticacaoRequestsInterceptor.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
AutenticacaoRequestsInterceptor.ctorParameters = () => [
    { type: AutenticacaoContextService }
];
/** @nocollapse */ AutenticacaoRequestsInterceptor.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AutenticacaoRequestsInterceptor_Factory() { return new AutenticacaoRequestsInterceptor(i0.ɵɵinject(i1.AutenticacaoContextService)); }, token: AutenticacaoRequestsInterceptor, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0ZW50aWNhY2FvLXJlcXVlc3RzLmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN0dWRpby91aS1hbmd1bGFyLWF1dGVudGljYWNhby8iLCJzb3VyY2VzIjpbImxpYi9hdXRlbnRpY2FjYW8tcmVxdWVzdHMuaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7O0FBRzVFLE1BQU0sT0FBTywrQkFBK0I7Ozs7SUFNMUMsWUFBb0IsNEJBQXdEO1FBQXhELGlDQUE0QixHQUE1Qiw0QkFBNEIsQ0FBNEI7UUFKcEUsMkJBQXNCLEdBQUcsS0FBSyxDQUFDO1FBQy9CLHlCQUFvQixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDckMsMEJBQXFCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBRU8sQ0FBQzs7Ozs7O0lBRWpGLFNBQVMsQ0FBQyxHQUFxQixFQUFFLElBQWlCO1FBRWhELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVU7Ozs7UUFBQyxDQUFDLEdBQXNCLEVBQUUsRUFBRTtZQUN0RixJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ25DLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO3FCQUNoQyxJQUFJLENBQ0gsU0FBUzs7O2dCQUFDLEdBQUcsRUFBRTtvQkFDYixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxDQUFDLEVBQUMsRUFDRixVQUFVOzs7O2dCQUFDLElBQUksQ0FBQyxFQUFFO29CQUNoQixJQUFJLENBQUMsNEJBQTRCLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQzNDLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMxQixDQUFDLEVBQUMsQ0FDSCxDQUFDO2FBQ0w7WUFDRCxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBRU4sQ0FBQzs7Ozs7OztJQUVPLFlBQVksQ0FBQyxHQUFxQixFQUFFLElBQWlCO1FBQzNELElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQy9CLE9BQU8sSUFBSSxVQUFVOzs7O1lBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTOzs7Z0JBQUMsR0FBRyxFQUFFO29CQUN4QyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2hCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQyxFQUFDLENBQUM7WUFDTCxDQUFDLEVBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ2hFLEdBQUc7OztRQUFDLEdBQUcsRUFBRTtZQUNQLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7WUFDcEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25DLENBQUMsRUFBQyxFQUNGLFVBQVU7Ozs7UUFBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7WUFDcEMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzNDLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7Ozs7SUFFTyxjQUFjLENBQUMsR0FBcUI7UUFDMUMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ2YsVUFBVSxFQUFFO2dCQUNWLGFBQWEsRUFBRSxVQUFVLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxjQUFjLEVBQUUsRUFBRTthQUM5RTtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7OztZQTFERixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7O1lBRnpCLDBCQUEwQjs7Ozs7Ozs7SUFLakMsaUVBQXVDOzs7OztJQUN2QywrREFBNkM7Ozs7O0lBQzdDLGdFQUF5RTs7Ozs7SUFFN0QsdUVBQWdFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cEludGVyY2VwdG9yLCBIdHRwUmVxdWVzdCwgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIHRocm93RXJyb3IsIGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXV0ZW50aWNhY2FvQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuL2F1dGVudGljYWNhby1jb250ZXh0LnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEF1dGVudGljYWNhb1JlcXVlc3RzSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuXG4gIHByaXZhdGUgcmVmcmVzaFRva2VuSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICBwcml2YXRlIHRva2VuUmVmcmVzaGVkU291cmNlID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSB0b2tlblJlZnJlc2hlZFNvdXJjZSQgPSB0aGlzLnRva2VuUmVmcmVzaGVkU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aGVudGljYXRpb25Db250ZXh0U2VydmljZTogQXV0ZW50aWNhY2FvQ29udGV4dFNlcnZpY2UpIHsgfVxuXG4gIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHRoaXMuYWRkQXV0aFJlcXVlc3QocmVxKSkucGlwZShjYXRjaEVycm9yKChlcnI6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAoWzQwMSwgNDEwXS5pbmNsdWRlcyhlcnIuc3RhdHVzKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWZyZXNoVG9rZW4ocmVxLCBuZXh0KVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHRoaXMuYWRkQXV0aFJlcXVlc3QocmVxKSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoZXJyMSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRpb25Db250ZXh0U2VydmljZS5sb2dvdXQoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyMSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnIpO1xuICAgIH0pKTtcblxuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoVG9rZW4ocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcikge1xuICAgIGlmICh0aGlzLnJlZnJlc2hUb2tlbkluUHJvZ3Jlc3MpIHtcbiAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShvYnNlcnZlciA9PiB7XG4gICAgICAgIHRoaXMudG9rZW5SZWZyZXNoZWRTb3VyY2UkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dCgpO1xuICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMucmVmcmVzaFRva2VuSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgcmV0dXJuIGZyb20odGhpcy5hdXRoZW50aWNhdGlvbkNvbnRleHRTZXJ2aWNlLnJlZnJlc2hUb2tlbigpKS5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgdGhpcy5yZWZyZXNoVG9rZW5JblByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgIHRoaXMudG9rZW5SZWZyZXNoZWRTb3VyY2UubmV4dCgpO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKChlcnIpID0+IHtcbiAgICAgICAgdGhpcy5yZWZyZXNoVG9rZW5JblByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXV0aGVudGljYXRpb25Db250ZXh0U2VydmljZS5sb2dvdXQoKTtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkQXV0aFJlcXVlc3QocmVxOiBIdHRwUmVxdWVzdDxhbnk+KSB7XG4gICAgcmV0dXJuIHJlcS5jbG9uZSh7XG4gICAgICBzZXRIZWFkZXJzOiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLmF1dGhlbnRpY2F0aW9uQ29udGV4dFNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKX1gXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==