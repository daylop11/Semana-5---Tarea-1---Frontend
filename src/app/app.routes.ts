import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/login/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },

  // NUEVA RUTA FACTURA
  {
    path: 'factura',
    loadComponent: () =>
      import('./features/facturacion/factura/factura')
        .then(m => m.FacturaComponent)
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
