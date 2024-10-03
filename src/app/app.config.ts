import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideNativeDateAdapter} from "@angular/material/core";
import {CovidCasesPageService} from "./pages/covid-cases-page/covid-cases-page.service";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNativeDateAdapter(),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    CovidCasesPageService
  ]
};
