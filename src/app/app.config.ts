import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import localeNlExtra from '@angular/common/locales/extra/nl';
import { ErrorHandlingService } from './core/services/error-handling.service';

registerLocaleData(localeNl, 'nl-NL', localeNlExtra);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), { provide: LOCALE_ID, useValue: 'nl-NL' }, { provide: ErrorHandler, useClass: ErrorHandlingService}]
};
