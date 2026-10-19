import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponsavelComponent } from './responsavel/responsavel.component';
import { ImovelComponent } from './imovel/imovel.component';
import { ContribuinteComponent } from './contribuinte/contribuinte.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SuporteTecnicoComponent } from './suporte-tecnico/suporte-tecnico.component';
import { SemPermissaoComponent } from './sem-permissao/sem-permissao.component';
import { PermissionGuard } from './session/permission.guard';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'responsavel', component: ResponsavelComponent, canActivate: [PermissionGuard], data: { capability: 'responsavel' } },
  { path: 'imovel', component: ImovelComponent, canActivate: [PermissionGuard], data: { capability: 'imovel' } },
  { path: 'contribuinte', component: ContribuinteComponent, canActivate: [PermissionGuard], data: { capability: 'contribuinte' } },
  { path: 'suporte-tecnico', component: SuporteTecnicoComponent, canActivate: [PermissionGuard], data: { role: 'support' } },
  { path: 'sem-permissao', component: SemPermissaoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
