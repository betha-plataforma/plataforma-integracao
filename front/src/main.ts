import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { oAuthApplication } from './app/authentication/oauth-application';

import { applyPolyfills, defineCustomElements } from '@betha-plataforma/estrutura-componentes/loader';

if (environment.production) {
  enableProdMode();
}

const bootstrap = (): Promise<void> => {
  if (!oAuthApplication.hasActiveSession()) {
    return oAuthApplication.login();
  }

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));

  applyPolyfills()
    .then(() => {
      defineCustomElements(window);
    });
};

bootstrap();

