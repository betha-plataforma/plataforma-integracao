import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SessionErrorInterceptor } from './session/session-error.interceptor';

import { CpfCnpjPipe } from '../pipes/cpfcnpj.pipe';
import { PhonePipe } from '../pipes/phone.pipe';

import { ResponsavelComponent } from './responsavel/responsavel.component';
import { ResponsavelService } from './responsavel/responsavel.service';
import { ImovelComponent } from './imovel/imovel.component';
import { ImovelService } from './imovel/imovel.service';
import { ContribuinteComponent } from './contribuinte/contribuinte.component';
import { ContribuinteService } from './contribuinte/contribuinte.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SuporteTecnicoComponent } from './suporte-tecnico/suporte-tecnico.component';
import { SemPermissaoComponent } from './sem-permissao/sem-permissao.component';



@NgModule({
  declarations: [
    AppComponent,
    CpfCnpjPipe,
    PhonePipe,
    ResponsavelComponent,
    ImovelComponent,
    ContribuinteComponent,
    DashboardComponent,
    SuporteTecnicoComponent,
    SemPermissaoComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: SessionErrorInterceptor, multi: true},
    ResponsavelService,
    ContribuinteService,
    ImovelService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
