import { Component, NgZone, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import {
  Authorization,
  AuthorizationConfig,
  ItemSelecaoContexto,
  OpcaoMenu,
  Utilitario,
  OpcaoMenuSelecionadaEvent,
  OpcaoUtilitarioSelecionadaEvent } from '@betha-plataforma/estrutura-componentes';

import { SessionService } from './session/session.service';
import { SessionEventsService } from './session/session-events.service';
import { PermissionGuard } from './session/permission.guard';
import { AccessRestriction, Session } from './session/session.model';
import { resolveRestriction, RestrictionAction, RestrictionInfo } from './session/restriction';

/**
 * Os componentes Betha recebem um token fictício: as chamadas deles vão para proxies do backend (BFF),
 * que usam o token real guardado na sessão do servidor.
 */
const BFF_ACCESS_TOKEN = 'bff-session';
const ROTA_TROCAR_CONTEXTO = 'context://select';
const ACOES_CENTRAL_USUARIO = [RestrictionAction.VERIFY_IDENTITY, RestrictionAction.CHANGE_PASSWORD, RestrictionAction.ENABLE_MFA];
const EVENTOS_ATIVIDADE = ['keypress', 'keydown', 'click', 'mousemove', 'scroll', 'touchmove', 'touchstart'];
const INTERVALO_ATIVIDADE_MS = 120000;
const INTERVALO_VERIFICACAO_MS = 60000;

type EstadoAcesso = 'carregando' | 'contexto' | 'termo' | 'restricao' | 'pronto';

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
  @ViewChild('selecaoContexto', { static: true }) selecaoContextoElement: ElementRef<HTMLBthSelecaoContextoElement>;

  public estado: EstadoAcesso = 'carregando';
  public mensagemRestricao: string;
  public erroRestricao: string;
  public termoAceito = false;
  public aceitandoTermo = false;
  public acaoRestricao: RestrictionAction = RestrictionAction.NONE;
  public restricaoFechavel = false;

  private opcoesMenu: Array<OpcaoMenu> = [];

  private opcoesUtilitarios: Array<Utilitario> = [
    { nome: 'Link externo', rota: 'https://aws.amazon.com/pt/console/', icone: 'amazon', possuiPermissao: true },
    { nome: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit', rota: '/', icone: 'merge', possuiPermissao: true, },
  ]

  private notificacoesConfiguradas = false;
  private ultimaAtividade = 0;
  private verificacaoIntervalo: number;
  private routerSubscription: Subscription;
  private restricaoSubscription: Subscription;

  constructor(
    public ngZone: NgZone,
    public router: Router,
    private sessionService: SessionService,
    private sessionEvents: SessionEventsService,
    private permissionGuard: PermissionGuard,
    ) { }

  ngOnInit() {
    this.restricaoSubscription = this.sessionEvents.restriction$.subscribe(restricao => {
      // Chamadas do monitor de atividade rodam fora da zona do Angular.
      this.ngZone.run(() => this.tratarRestricao(restricao));
    });

    Promise.all(['bth-app', 'bth-marca-produto', 'bth-utilitarios', 'bth-notificacoes', 'bth-conta-usuario', 'bth-selecao-contexto']
      .map(tag => customElements.whenDefined(tag)))
      .then(() => this.ngZone.run(() => this.inicializar()));
  }

  ngOnDestroy() {
    this.restricaoSubscription.unsubscribe();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    EVENTOS_ATIVIDADE.forEach(evento => window.removeEventListener(evento, this.registrarAtividade));
    window.clearInterval(this.verificacaoIntervalo);
  }

  isUrl(text) {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  }

  novoLogin() {
    this.sessionService.logout().catch(() => this.sessionEvents.redirectToLogin());
  }

  fecharRestricao() {
    this.restricaoFechavel = false;
    this.estado = 'pronto';
  }

  podeTrocarEntidade(): boolean {
    const session = this.sessionService.current();
    return this.acaoRestricao === RestrictionAction.SELECT_ANOTHER_ACCESS && !!session && session.contexts.length > 1;
  }

  trocarEntidade() {
    this.mostrarSelecaoContexto(this.sessionService.current());
  }

  /**
   * Verificação de identidade, política de senha e autenticação em duas etapas são resolvidas pelo
   * usuário na Central do Usuário da Betha.
   */
  urlCentralUsuario(): string {
    if (!ACOES_CENTRAL_USUARIO.includes(this.acaoRestricao)) {
      return null;
    }
    const envs = window['___bth'] && window['___bth'].envs;
    const central = envs && envs.suite && envs.suite['central-usuarios'];
    return central && central.v1 && central.v1.host || null;
  }

  abrirCentralUsuario() {
    window.open(this.urlCentralUsuario(), '_blank', 'noopener');
  }

  aceitarTermo() {
    if (!this.termoAceito) {
      return;
    }
    this.aceitandoTermo = true;
    this.erroRestricao = null;
    this.sessionService.acceptTerm()
      .then(session => this.renderizarSessao(session) ? this.sessionService.verify().then(() => true) : false)
      .then(pronto => pronto ? this.sessionService.activity() : null)
      .catch((error: HttpErrorResponse) => {
        if (this.isErroDeSessao(error)) {
          return;
        }
        this.erroRestricao = error && error.error && error.error.message || 'Não foi possível registrar o aceite.';
      })
      .finally(() => this.aceitandoTermo = false);
  }

  private inicializar() {
    this.configurarApp();
    this.configurarContaUsuario();
    this.configurarUtilitarios();
    this.instalarMonitorAtividade();

    this.sessionService.load()
      .then(session => this.renderizarSessao(session)
        ? this.sessionService.verify().then(() => this.sessionService.activity())
        : null)
      .catch((error: HttpErrorResponse) => {
        if (!this.isErroDeSessao(error)) {
          this.mostrarErroRequisicao(error, 'Não foi possível inicializar a integração com a Plataforma Betha.');
        }
      });
  }

  /**
   * Aplica a sessão à interface. Retorna true quando o acesso está pronto para uso (contexto selecionado
   * e termo aceito).
   */
  private renderizarSessao(session: Session): boolean {
    if (!session.selectedContext) {
      if (session.contexts.length > 0) {
        this.mostrarSelecaoContexto(session);
      } else {
        this.mostrarRestricao({
          code: 'NO_SYSTEM_ACCESS',
          message: 'Seu usuário não possui um acesso válido para este sistema.'
        });
      }
      return false;
    }

    this.atualizarContaUsuario(session);

    if (!session.selectedContext.accepted) {
      this.opcoesMenu = [];
      this.appElement.nativeElement.opcoes = this.opcoesMenu;
      this.marcaProdutoElement.nativeElement.exibirProdutos = false;
      this.utilitariosElement.nativeElement.utilitarios = [];
      this.mostrarTermo();
      return false;
    }

    this.estado = 'pronto';
    this.configurarMarcaProduto(session);
    this.atualizarUtilitarios(session);
    this.configurarNotificacoes();
    this.opcoesMenu = this.montarOpcoesMenu();
    this.appElement.nativeElement.opcoes = this.opcoesMenu;

    if (!this.permissionGuard.isAllowed(this.rotaAtual().data)) {
      this.router.navigate(['/']);
    } else {
      this.setMenuAtivoPorRota(this.router.url);
    }
    return true;
  }

  private montarOpcoesMenu(): Array<OpcaoMenu> {
    const opcoes: Array<OpcaoMenu> = [
      { id: 'menu-dashboard', descricao: 'Visão geral', icone: 'home', rota: '/', possuiPermissao: true },
      { id: 'menu-responsavel', descricao: 'Responsáveis', icone: 'home', rota: '/responsavel',
        possuiPermissao: this.sessionService.can('responsavel') },
      { id: 'menu-imovel', descricao: 'Imóveis', icone: 'home', rota: '/imovel',
        possuiPermissao: this.sessionService.can('imovel') },
      { id: 'menu-contribuinte', descricao: 'Contribuintes', icone: 'home', rota: '/contribuinte',
        possuiPermissao: this.sessionService.can('contribuinte') }
    ];

    if (this.sessionService.hasSupportAccess()) {
      opcoes.push({ id: 'menu-suporte-tecnico', descricao: 'Suporte técnico', icone: 'account-search',
        rota: '/suporte-tecnico', possuiPermissao: true });
    }
    return opcoes;
  }

  private rotaAtual(): ActivatedRouteSnapshot {
    let rota = this.router.routerState.snapshot.root;
    while (rota.firstChild) {
      rota = rota.firstChild;
    }
    return rota;
  }

  private configurarApp() {
    this.appElement.nativeElement.opcoes = this.opcoesMenu;

    this.appElement.nativeElement.addEventListener('opcaoMenuSelecionada', (event: CustomEvent<OpcaoMenuSelecionadaEvent>) => {
      this.ngZone.run(() => {
        this.router.navigate([event.detail.rota]);
      });
    });

    this.routerSubscription = this.router.events.subscribe(routeEvent => {
      if (routeEvent instanceof NavigationEnd) {
        this.setMenuAtivoPorRota(routeEvent.urlAfterRedirects);
      }
    });
  }

  private setMenuAtivoPorRota(rota: string) {
    this.opcoesMenu.forEach(opcaoMenu => {
      if (opcaoMenu.rota === rota && opcaoMenu.possuiPermissao) {
        this.appElement.nativeElement.setMenuAtivo(opcaoMenu.id);
      }

      if (opcaoMenu.submenus) {
        opcaoMenu.submenus.forEach(submenu => {
          if (rota.includes(submenu.rota) && submenu.possuiPermissao) {
            this.appElement.nativeElement.setMenuAtivo(submenu.id);
          }
        });
      }
    })
  }

  private configurarMarcaProduto(session: Session) {
    const marcaProduto = this.marcaProdutoElement.nativeElement;
    marcaProduto.exibirProdutos = false;
    marcaProduto.userAccountsApi = `${window.location.origin}/api/betha/user-accounts`;
    marcaProduto.authorization = {
      getAuthorization: (): Authorization => ({
        accessId: session.selectedContext.accessId,
        accessToken: BFF_ACCESS_TOKEN,
        systemId: session.systemId
      }),
      handleUnauthorizedAccess: this.handleUnauthorizedAccess
    };
    // Alternar exibirProdutos força o componente a buscar os sistemas do novo contexto.
    setTimeout(() => marcaProduto.exibirProdutos = true);
  }

  private configurarContaUsuario() {
    this.contaUsuarioElement.nativeElement.addEventListener('logout', () => {
      this.ngZone.run(() => this.novoLogin());
    });
  }

  private atualizarContaUsuario(session: Session) {
    this.contaUsuarioElement.nativeElement.usuario = session.user.id;
    this.contaUsuarioElement.nativeElement.nome = session.user.name || session.user.id;
    this.contaUsuarioElement.nativeElement.fotoUrl = session.user.photoUrl;
  }

  private configurarUtilitarios() {
    this.utilitariosElement.nativeElement.utilitarios = [];

    this.utilitariosElement.nativeElement.addEventListener('opcaoUtilitarioSelecionada', (event: CustomEvent<OpcaoUtilitarioSelecionadaEvent>) => {
      this.ngZone.run(() => {
        if (event.detail.rota === ROTA_TROCAR_CONTEXTO) {
          this.mostrarSelecaoContexto(this.sessionService.current());
          return;
        }

        if (this.isUrl(event.detail.rota)) {
          window.open(event.detail.rota, '_blank', 'noopener')
          return;
        }

        this.router.navigate([event.detail.rota]);
      });
    });
  }

  private atualizarUtilitarios(session: Session) {
    const utilitariosIntegracao: Array<Utilitario> = [];
    if (session.contexts.length > 1) {
      utilitariosIntegracao.push({ nome: 'Trocar entidade', rota: ROTA_TROCAR_CONTEXTO, icone: 'swap-horizontal', possuiPermissao: true });
    }
    if (session.managerUrl) {
      utilitariosIntegracao.push({ nome: 'Gerenciador de Acessos', rota: session.managerUrl, icone: 'key-variant', possuiPermissao: true });
    }
    this.utilitariosElement.nativeElement.utilitarios = [...utilitariosIntegracao, ...this.opcoesUtilitarios];
  }

  private configurarNotificacoes() {
    if (this.notificacoesConfiguradas) {
      return;
    }
    this.notificacoesConfiguradas = true;

    const notificacoes = this.notificacoesElement.nativeElement;
    const protocoloWs = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    notificacoes.notificacoesApi = `${window.location.origin}/api/betha/notificacoes`;
    notificacoes.notificacoesWs = `${protocoloWs}//${window.location.host}/api/betha/notificacoes/ws`;
    // Por último: a troca de authorization inicializa o componente com as URLs acima.
    notificacoes.authorization = this.getAuthConfig();
  }

  private getAuthConfig = (): AuthorizationConfig => ({
    getAuthorization: this.getAuthorization,
    handleUnauthorizedAccess: this.handleUnauthorizedAccess
  })

  private getAuthorization = (): Authorization => {
    const session = this.sessionService.current();
    return {
      accessToken: BFF_ACCESS_TOKEN,
      systemId: session && session.systemId
    };
  }

  /**
   * Chamado pelos componentes Betha ao receber 401 dos proxies. A verificação no backend renova o token
   * da sessão quando possível; se a sessão local acabou, o interceptor redireciona para o login.
   */
  private handleUnauthorizedAccess = (): Promise<void> => {
    return this.sessionService.verify().catch(() => undefined);
  }

  private mostrarSelecaoContexto(session: Session) {
    const selecaoContexto = this.selecaoContextoElement.nativeElement;
    selecaoContexto.buscar = (): Promise<ItemSelecaoContexto[]> => Promise.resolve(session.contexts.map(contexto => ({
      id: contexto.accessId,
      descricao: contexto.description,
      complemento: contexto.complement,
      icone: 'domain'
    })));
    selecaoContexto.selecionar = (item: ItemSelecaoContexto) => {
      this.ngZone.run(() => this.selecionarContexto(String(item.id)));
    };
    this.estado = 'contexto';
  }

  private selecionarContexto(accessId: string) {
    this.estado = 'carregando';
    this.sessionService.selectContext(accessId, this.exercicioAtual())
      .then(session => this.renderizarSessao(session) ? this.sessionService.verify().then(() => true) : false)
      .then(pronto => pronto ? this.sessionService.activity() : null)
      .catch((error: HttpErrorResponse) => {
        if (!this.isErroDeSessao(error)) {
          this.mostrarErroRequisicao(error, 'Não foi possível selecionar o contexto de acesso.');
        }
      });
  }

  /**
   * Exercício recebido de outro sistema da Betha, mantido ao trocar de entidade e repassado aos links
   * de produtos.
   */
  private exercicioAtual(): string {
    return new URLSearchParams(window.location.search).get('exercicio') || undefined;
  }

  private tratarRestricao(restricao: AccessRestriction) {
    const session = this.sessionService.current();
    const info = resolveRestriction(restricao, session && session.selectedContext);
    if (info.action === RestrictionAction.ACCEPT_TERMS) {
      this.mostrarTermo();
      return;
    }
    this.mostrarRestricao(restricao, info);
  }

  /**
   * Sem `info`, é um bloqueio da própria integração (ex.: sem acesso ao sistema, falha ao inicializar),
   * que só um novo login resolve.
   */
  private mostrarRestricao(restricao: AccessRestriction, info?: RestrictionInfo) {
    // Uma operação negada sem restrição de acesso só pode ser fechada se a aplicação já estava liberada.
    this.restricaoFechavel = !!info && info.action === RestrictionAction.DISMISS && this.estado === 'pronto';
    this.acaoRestricao = info ? info.action : RestrictionAction.NONE;
    this.estado = 'restricao';
    this.mensagemRestricao = info ? info.message : restricao.message || 'A Plataforma Betha bloqueou este acesso.';
    const detalhes = [];
    if (restricao.code) {
      detalhes.push('Código: ' + restricao.code);
    }
    if (restricao.httpStatus) {
      detalhes.push('HTTP ' + restricao.httpStatus);
    }
    this.erroRestricao = detalhes.length ? detalhes.join(' · ') : null;
  }

  private mostrarErroRequisicao(error: HttpErrorResponse, mensagemPadrao: string) {
    const restricao = error && error.error && typeof error.error === 'object' ? error.error : { message: mensagemPadrao };
    this.mostrarRestricao({ ...restricao, httpStatus: error && error.status || undefined });
  }

  private mostrarTermo() {
    this.estado = 'termo';
    this.restricaoFechavel = false;
    this.acaoRestricao = RestrictionAction.ACCEPT_TERMS;
    this.termoAceito = false;
    this.erroRestricao = null;
    this.mensagemRestricao = 'Carregando o termo…';

    this.sessionService.getTerm()
      .then(termo => {
        this.mensagemRestricao = termo && (termo.text || termo.message)
          || 'Reconheço o acesso concedido e declaro ciência das responsabilidades de uso.';
      })
      .catch((error: HttpErrorResponse) => {
        this.erroRestricao = error && error.error && error.error.message || 'Não foi possível carregar o termo.';
      });
  }

  private isErroDeSessao(error: HttpErrorResponse): boolean {
    return !!error && (error.status === 401 || error.status === 403);
  }

  private contextoAceito(): boolean {
    const session = this.sessionService.current();
    return !!(session && session.selectedContext && session.selectedContext.accepted) && this.estado === 'pronto';
  }

  /**
   * Registra atividade na Plataforma (no máximo a cada 2 minutos) para o controle de inatividade, e
   * verifica a sessão a cada minuto para detectar timeout, desconexão administrativa, login concorrente
   * e restrições de horário/IP. Roda fora da zona do Angular para que eventos como mousemove não
   * disparem detecção de mudanças.
   */
  private instalarMonitorAtividade() {
    this.ngZone.runOutsideAngular(() => {
      EVENTOS_ATIVIDADE.forEach(evento => window.addEventListener(evento, this.registrarAtividade, { passive: true }));
      this.verificacaoIntervalo = window.setInterval(() => {
        if (this.contextoAceito()) {
          this.sessionService.verify().catch(() => undefined);
        }
      }, INTERVALO_VERIFICACAO_MS);
    });
  }

  private registrarAtividade = () => {
    if (!this.contextoAceito()) {
      return;
    }
    const agora = Date.now();
    if (agora - this.ultimaAtividade < INTERVALO_ATIVIDADE_MS) {
      return;
    }
    this.ultimaAtividade = agora;
    this.sessionService.activity().catch(() => undefined);
  }

}
