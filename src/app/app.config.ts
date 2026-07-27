import { ApplicationConfig, provideBrowserGlobalErrorListeners, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

// Türkçe locale verisini kayıt ediyoruz
registerLocaleData(localeTr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(),
    { provide: LOCALE_ID, useValue: 'tr-TR' },
  ],
};
