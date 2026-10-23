import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { applyPolyfills, defineCustomElements } from '@betha-plataforma/estrutura-componentes/loader';

if (environment.production) {
  enableProdMode();
}

// O login é conduzido pelo backend (BFF): sem sessão, a primeira chamada à API responde 401 e o
// SessionErrorInterceptor redireciona para /login.
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

applyPolyfills()
  .then(() => {
    defineCustomElements(window);
  });
