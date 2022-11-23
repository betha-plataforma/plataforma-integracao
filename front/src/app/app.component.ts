import { Component, NgZone, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router"
import { Subscription } from 'rxjs';

import { 
  Authorization, 
  AuthorizationConfig, 
  OpcaoMenu, 
  Utilitario, 
  OpcaoMenuSelecionadaEvent, 
  OpcaoUtilitarioSelecionadaEvent } from '@betha-plataforma/estrutura-componentes';

import {AutenticacaoContextService, Usuario} from './authentication/ui-angular-autenticacao';
import {oAuthApplication} from './authentication/oauth-application';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  @ViewChild('app', { static: true }) appElement: ElementRef<HTMLBthAppElement>;
  @ViewChild('marcaProduto', { static: true }) marcaProdutoElement: ElementRef<HTMLBthMarcaProdutoElement>;
  @ViewChild('contaUsuario', { static: true }) contaUsuarioElement: ElementRef<HTMLBthContaUsuarioElement>;
  @ViewChild('utilitarios', { static: true }) utilitariosElement: ElementRef<HTMLBthUtilitariosElement>;
  @ViewChild('notificacoes', { static: true }) notificacoesElement: ElementRef<HTMLBthNotificacoesElement>;

  private opcoesMenu: Array<OpcaoMenu> = [
    { id: 'menu-dashboard', descricao: 'Visão geral', icone: 'home', rota: '/', possuiPermissao: true },
    { id: 'menu-responsavel', descricao: 'Responsáveis', icone: 'home', rota: '/responsavel', possuiPermissao: true },
    { id: 'menu-imovel', descricao: 'Imóveis', icone: 'home', rota: '/imovel', possuiPermissao: true },
    { id: 'menu-contribuinte', descricao: 'Contribuintes', icone: 'home', rota: '/contribuinte', possuiPermissao: true }
  ];

  private opcoesUtilitarios: Array<Utilitario> = [
    { nome: 'Link externo', rota: 'https://aws.amazon.com/pt/console/', icone: 'amazon', possuiPermissao: true },
    { nome: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit', rota: '/', icone: 'merge', possuiPermissao: true, },
  ]

  constructor(
    public ngZone: NgZone, 
    public router: Router,
    private autenticacaoContextService: AutenticacaoContextService,

    ) { }

  private userInfoSubscription: Subscription;

  ngOnInit() {
    this.configurarApp();
    this.configurarMarcaProduto();
    
    this.userInfoSubscription = this.autenticacaoContextService.getInformacaoUsuario().subscribe(usuario => {
      this.configurarContaUsuario(usuario);
      this.configurarNotificacoes();
    });

    this.configurarUtilitarios();

  }

  ngOnDestroy() {
    this.userInfoSubscription.unsubscribe();
  }

  isUrl(text) {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  }

  private configurarApp() {
    this.appElement.nativeElement.opcoes = this.opcoesMenu;

    this.appElement.nativeElement.addEventListener('opcaoMenuSelecionada', (event: CustomEvent<OpcaoMenuSelecionadaEvent>) => {
      this.ngZone.run(() => {
        this.router.navigate([event.detail.rota]);
      });
    });

    this.setMenuAtivoPorRota(this.router.url);

    this.router.events.subscribe(routeEvent => {
      if (routeEvent instanceof NavigationEnd) {
        const route: NavigationEnd = routeEvent;
        if (route.url === '/contexto') {
          this.appElement.nativeElement.opcoes = [];
        } else {
            this.appElement.nativeElement.opcoes = this.opcoesMenu;
        }
        this.setMenuAtivoPorRota(route.url);
      }
    });
  }

  private setMenuAtivoPorRota(rota: string) {
    this.opcoesMenu.forEach(opcaoMenu => {
      if (opcaoMenu.rota === rota) {
        this.appElement.nativeElement.setMenuAtivo(opcaoMenu.id);
      }

      if (opcaoMenu.submenus) {
        opcaoMenu.submenus.forEach(submenu => {
          if (rota.includes(submenu.rota)) {
            this.appElement.nativeElement.setMenuAtivo(submenu.id);
          }
        });
      }
    })
  }

  private configurarMarcaProduto() {
    this.marcaProdutoElement.nativeElement.authorization = this.getAuthConfig();
  }

  private async configurarContaUsuario(usuario: Usuario) {
    await customElements.whenDefined('bth-conta-usuario');

    this.contaUsuarioElement.nativeElement.usuario = usuario.id;
    this.contaUsuarioElement.nativeElement.nome = usuario.nome;
    this.contaUsuarioElement.nativeElement.fotoUrl = usuario.foto;

    this.contaUsuarioElement.nativeElement.addEventListener('logout', () => {
      this.autenticacaoContextService.logout();
    });
  }

  private configurarUtilitarios() {
    this.utilitariosElement.nativeElement.utilitarios = this.opcoesUtilitarios;

    this.utilitariosElement.nativeElement.addEventListener('opcaoUtilitarioSelecionada', (event: CustomEvent<OpcaoUtilitarioSelecionadaEvent>) => {
      this.ngZone.run(() => {
        if (this.isUrl(event.detail.rota)) {
          window.open(event.detail.rota, '_blank')
          return;
        }

        this.router.navigate([event.detail.rota]);
      });
    });
  }

  private async configurarNotificacoes() {
    await customElements.whenDefined('bth-notificacoes');
    this.notificacoesElement.nativeElement.authorization = this.getAuthConfig();
  }

  private getAuthConfig = (): AuthorizationConfig => ({
    getAuthorization: this.getAuthorization,
    handleUnauthorizedAccess: this.handleUnauthorizedAccess
  })

  private getAuthorization = (): Authorization => {

    return {
      accessToken: this.autenticacaoContextService.getAccessToken(),
      //accessId: '',
      //systemId: 
    };
  }

  private handleUnauthorizedAccess = async (): Promise<void> => {
    if (oAuthApplication.hasActiveSession()) {
      return Promise.resolve();
    }

    await oAuthApplication.silentRefresh();

    return Promise.resolve();
  }

}
