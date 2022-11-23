/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
export function bethaOIDCProviderFactory(config) {
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
    return tslib_1.__assign({}, config, { provider: provider });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmV0aGEtb2lkYy1wcm92aWRlci1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN0dWRpby91aS1hbmd1bGFyLWF1dGVudGljYWNhby8iLCJzb3VyY2VzIjpbImxpYi9iZXRoYS1vaWRjLXByb3ZpZGVyLWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBRU0sU0FBUyxHQUFXLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSTs7O0lBQzdELGlCQUFpQixHQUFXLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJOzs7SUFDaEYsU0FBUyxHQUFXLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSTs7Ozs7QUFJdEUsTUFBTSxVQUFVLHdCQUF3QixDQUFDLE1BQStCOztRQUNoRSxRQUFRLEdBQW1CO1FBQy9CLHNCQUFzQixFQUFLLFNBQVMsZUFBWTtRQUNoRCxvQkFBb0IsRUFBSyxpQkFBaUIsbUJBQWdCO1FBQzFELG9CQUFvQixFQUFLLGlCQUFpQix5QkFBb0IsU0FBUyw2QkFBd0IsTUFBTSxDQUFDLFFBQVEsOENBQXlDLE1BQU0sQ0FBQyxXQUFXLGlCQUFZLE1BQU0sQ0FBQyxLQUFPOztRQUNuTSxtQkFBbUIsRUFBSyxTQUFTLGVBQVk7UUFDN0MsY0FBYyxFQUFLLFNBQVMsV0FBUTtRQUNwQyxpQkFBaUIsRUFBSyxTQUFTLHNCQUFtQjtLQUNuRDtJQUNELDRCQUFZLE1BQU0sSUFBRSxRQUFRLFVBQUEsSUFBRztBQUNqQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT0F1dGhDb25maWcsIE9wZW5JRFByb3ZpZGVyIH0gZnJvbSAnQGJldGhhLXBsYXRhZm9ybWEvb2F1dGgnO1xuXG5jb25zdCBPQVVUSF9VUkw6IHN0cmluZyA9IHdpbmRvd1snX19fYnRoJ10uZW52cy5zdWl0ZS5vYXV0aC52MS5ob3N0OyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG5jb25zdCBTRVJWSUNFX0xPR0lOX1VSTDogc3RyaW5nID0gd2luZG93WydfX19idGgnXS5lbnZzLnN1aXRlWydzZXJ2aWNlLWxvZ2luJ10udjEuaG9zdDsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuY29uc3QgVVNFUlNfVVJMOiBzdHJpbmcgPSB3aW5kb3dbJ19fX2J0aCddLmVudnMuc3VpdGUudXN1YXJpb3MudjEuaG9zdDsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuXG50eXBlIE9BdXRoQ29uZmlnQXV0b1Byb3ZpZGVyID0gUGljazxPQXV0aENvbmZpZywgRXhjbHVkZTxrZXlvZiBPQXV0aENvbmZpZywgJ3Byb3ZpZGVyJz4+O1xuXG5leHBvcnQgZnVuY3Rpb24gYmV0aGFPSURDUHJvdmlkZXJGYWN0b3J5KGNvbmZpZzogT0F1dGhDb25maWdBdXRvUHJvdmlkZXIpOiBPQXV0aENvbmZpZyB7XG4gIGNvbnN0IHByb3ZpZGVyOiBPcGVuSURQcm92aWRlciA9IHtcbiAgICBhdXRob3JpemF0aW9uX2VuZHBvaW50OiBgJHtPQVVUSF9VUkx9L2F1dGhvcml6ZWAsXG4gICAgY2hlY2tfc2Vzc2lvbl9pZnJhbWU6IGAke1NFUlZJQ0VfTE9HSU5fVVJMfS9vcGVuaWRzc28uanNwYCxcbiAgICBlbmRfc2Vzc2lvbl9lbmRwb2ludDogYCR7U0VSVklDRV9MT0dJTl9VUkx9L2xvZ291dD9jb250aW51ZT0ke09BVVRIX1VSTH0vYXV0aG9yaXplP2NsaWVudF9pZD0ke2NvbmZpZy5jbGllbnRJZH0lMjZyZXNwb25zZV90eXBlPXRva2VuJTI2cmVkaXJlY3RfdXJpPSR7Y29uZmlnLnJlZGlyZWN0VXJpfSUyNnNjb3BlPSR7Y29uZmlnLnNjb3BlfWAsIC8vdHNsaW50OmRpc2FibGUtbGluZVxuICAgIGludHJvc3BlY3RfZW5kcG9pbnQ6IGAke09BVVRIX1VSTH0vdG9rZW5pbmZvYCxcbiAgICB0b2tlbl9lbmRwb2ludDogYCR7T0FVVEhfVVJMfS90b2tlbmAsXG4gICAgdXNlcmluZm9fZW5kcG9pbnQ6IGAke1VTRVJTX1VSTH0vYXBpL3VzdWFyaW9zL0BtZWBcbiAgfTtcbiAgcmV0dXJuIHsgLi4uY29uZmlnLCBwcm92aWRlciB9O1xufVxuXG4iXX0=