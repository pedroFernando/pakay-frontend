import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'not403',
        loadChildren: () => import('../../pages/not403/not403.module').then( c => c.Not403Module),
      },
      {
        path: 'amortizacion',
        loadChildren: () => import('../../pages/amortizacion/amortizacion.module').then( a => a.AmortizacionModule),
      },
      {
        path: 'aporte',
        loadChildren: () => import('../../pages/aporte/aporte.module').then( a => a.AporteModule),
      },
      {
        path: 'caja',
        loadChildren: () => import('../../pages/caja/caja.module').then( c => c.CajaModule),
      },
      {
        path: 'empresa',
        loadChildren: () => import('../../pages/aut/empresa/empresa.module').then( e => e.EmpresaModule),
      },
      {
        path: 'usuario',
        loadChildren: () => import('../../pages/usuario/usuario.module').then( u => u.UsuarioModule),
      },
      {
        path: '',
        loadChildren: () => import('../../pages/inicio/inicio.module').then( i => i.InicioModule),
      },
      {
        path: 'perfil',
        loadChildren: () => import('../../pages/usuario/usuario-perfil/usuario-perfil.module').then( p => p.UsuarioPerfilModule),
      },
      {
        path: 'prestamo',
        loadChildren: () => import('../../pages/prestamo/prestamo.module').then( p => p.PrestamoModule),
      },
      {
        path: 'reporte',
        loadChildren: () => import('../../pages/reporte/reporte.module').then( r => r.ReporteModule),
      },
      {
        path: 'socio',
        loadChildren: () => import('../../pages/socio/socio.module').then( s => s.SocioModule),
      },
      {
        path: 'transaccion',
        loadChildren: () => import('../../pages/transaccion/transaccion.module').then( t => t.TransaccionModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
