/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutenticacaoRequestsInterceptor } from './autenticacao-requests.interceptor';
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
export { AutenticacaoModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0ZW50aWNhY2FvLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzdHVkaW8vdWktYW5ndWxhci1hdXRlbnRpY2FjYW8vIiwic291cmNlcyI6WyJsaWIvYXV0ZW50aWNhY2FvLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFHdEY7SUFBQTtJQVdrQyxDQUFDOztnQkFYbEMsUUFBUSxTQUFDO29CQUNOLFlBQVksRUFBRSxFQUFFO29CQUNoQixPQUFPLEVBQUU7d0JBQ0wsWUFBWTtxQkFDZjtvQkFDRCxTQUFTLEVBQUUsQ0FBQzs0QkFDUixPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixRQUFRLEVBQUUsK0JBQStCOzRCQUN6QyxLQUFLLEVBQUUsSUFBSTt5QkFDZCxDQUFDO2lCQUNMOztJQUNpQyx5QkFBQztDQUFBLEFBWG5DLElBV21DO1NBQXRCLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBBdXRlbnRpY2FjYW9SZXF1ZXN0c0ludGVyY2VwdG9yIH0gZnJvbSAnLi9hdXRlbnRpY2FjYW8tcmVxdWVzdHMuaW50ZXJjZXB0b3InO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbe1xuICAgICAgICBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUyxcbiAgICAgICAgdXNlQ2xhc3M6IEF1dGVudGljYWNhb1JlcXVlc3RzSW50ZXJjZXB0b3IsXG4gICAgICAgIG11bHRpOiB0cnVlXG4gICAgfV1cbn0pXG5leHBvcnQgY2xhc3MgQXV0ZW50aWNhY2FvTW9kdWxlIHsgfVxuIl19