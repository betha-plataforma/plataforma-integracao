import { OAuthApplication } from '@betha-plataforma/oauth';
import { environment } from '../../environments/environment';
import { bethaOIDCProviderFactory } from './ui-angular-autenticacao';

export const oAuthApplication: OAuthApplication = new OAuthApplication(bethaOIDCProviderFactory({
  scope: environment.authentication.scope,
  clientId: environment.authentication.clientId,
  redirectUri: `${window.location.origin}/callback.html`,
  silentRedirectUri: `${window.location.origin}/silent-callback.html`
}));
