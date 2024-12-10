import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms';
import { appRoutes } from './app.routes';

export const appConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      RouterModule.forRoot(appRoutes),
      CommonModule, // Asegúrate de incluir CommonModule
      FormsModule
    )
  ]
};
