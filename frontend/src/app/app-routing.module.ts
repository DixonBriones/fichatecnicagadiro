import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioComponent } from './components/inventario/inventario.component';
import { LoginComponent } from './components/login/login.component';
import {ComponenteComponent} from './components/componente/componente.component'

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
