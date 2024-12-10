import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TransferComponent } from './transfer/transfer.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent }, // Ruta principal
  { path: 'transfer', component: TransferComponent } // Ruta para transferencias
];
