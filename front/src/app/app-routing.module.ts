import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponsavelComponent } from './responsavel/responsavel.component';
import { ImovelComponent } from './imovel/imovel.component';
import { ContribuinteComponent } from './contribuinte/contribuinte.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'responsavel', component: ResponsavelComponent },
  { path: 'imovel', component: ImovelComponent },
  { path: 'contribuinte', component: ContribuinteComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
