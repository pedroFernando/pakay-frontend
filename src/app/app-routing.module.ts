import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from './_service/guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
    canActivate: [GuardService],
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( l => l.LoginModule),
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( r => r.RegistroModule),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    paramsInheritanceStrategy: 'always',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
