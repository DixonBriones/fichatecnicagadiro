import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioComponent } from './components/inventario/inventario.component';
import { LoginComponent } from './components/login/login.component';
import {ComponenteComponent} from './components/componente/componente.component'
import {FichaComponent} from './components/ficha/ficha.component'
import {MantenimientoComponent} from './components/mantenimiento/mantenimiento.component'

import { AuthGuard } from './guards/auth.guard';
import { CheckeloginGuard } from './guards/checkelogin.guard';


const routes: Routes = [
  {path: '', redirectTo: '/inventario', pathMatch:'full'},
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CheckeloginGuard]
  },
  {
    path: 'inventario',
    component: InventarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'componente',
    component: ComponenteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inventario/:id',
    component: FichaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mantenimiento',
    component: MantenimientoComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
