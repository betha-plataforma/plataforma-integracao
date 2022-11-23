import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {oAuthApplication} from './authentication/oauth-application';
import {AutenticacaoModule, OAUTH_APPLICATION} from './authentication/ui-angular-autenticacao';

import { CpfCnpjPipe } from '../pipes/cpfcnpj.pipe';
import { PhonePipe } from '../pipes/phone.pipe';

import { ResponsavelComponent } from './responsavel/responsavel.component';
import { ResponsavelService } from './responsavel/responsavel.service';
import { ImovelComponent } from './imovel/imovel.component';
import { ImovelService } from './imovel/imovel.service';
import { ContribuinteComponent } from './contribuinte/contribuinte.component';
import { ContribuinteService } from './contribuinte/contribuinte.service';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    AppComponent, 
    CpfCnpjPipe,
    PhonePipe, 
    ResponsavelComponent, 
    ImovelComponent,
    ContribuinteComponent,
    DashboardComponent,
  ],
  imports: [
    HttpClientModule,
    AutenticacaoModule,
    BrowserModule,
    AppRoutingModule, 
    NgbModule,
    FormsModule],
  providers: [
    {provide: OAUTH_APPLICATION, useValue: oAuthApplication},
    ResponsavelService,
    ContribuinteService,
    ImovelService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
