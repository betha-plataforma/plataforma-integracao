import { AccessRestriction, SessionContext } from './session.model';

/**
 * O que a interface oferece ao usuário diante de uma restrição de acesso da Plataforma Betha.
 */
export enum RestrictionAction {
  /** Bloqueia este acesso; o usuário pode escolher outra entidade, se houver. */
  SELECT_ANOTHER_ACCESS = 'SELECT_ANOTHER_ACCESS',
  /** A sessão na Plataforma acabou; é preciso fazer novo login. */
  LOGIN = 'LOGIN',
  ACCEPT_TERMS = 'ACCEPT_TERMS',
  VERIFY_IDENTITY = 'VERIFY_IDENTITY',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  ENABLE_MFA = 'ENABLE_MFA',
  /** Bloqueio sem ação de recuperação para o usuário. */
  NONE = 'NONE',
  /** Operação negada sem restrição de acesso (ex.: sem permissão); não bloqueia a aplicação. */
  DISMISS = 'DISMISS'
}

export interface RestrictionInfo {
  readonly type: string;
  readonly message: string;
  readonly action: RestrictionAction;
  /** A sessão local não pode ser reaproveitada: só um novo login resolve. */
  readonly requiresLogout: boolean;
}

const FALLBACK_MESSAGE = 'O seu acesso não está autorizado';

const MESSAGES: { [type: string]: string } = {
  RESTRICTED_PERIOD: 'O seu acesso não está autorizado neste horário',
  RESTRICTED_IP: 'O seu acesso não está autorizado a partir do seu endereço de IP',
  RESTRICTED_SESSION: 'Sua sessão expirou. Faça o login para continuar no sistema.',
  RESTRICTED_UNIQUE_SESSION:
    'O sistema foi acessado em outro local, como por exemplo, em outro navegador, janela anônima ou dispositivo.',
  RESTRICTED_DISCONNECTED_SESSION:
    'O administrador do sistema desconectou sua sessão. Verifique com o responsável a situação ocorrida ou faça login novamente.',
  RESTRICTED_TERM_OF_RESPONSIBILITY: 'Você precisa aceitar o termo de responsabilidade.',
  RESTRICTED_IDENTITY_VERIFICATION:
    'Acesso restrito somente a usuários autorizados pela entidade e com a identidade verificada.',
  RESTRICTED_PASSWORD_POLICY:
    'O seu acesso não está autorizado pela política de senhas definida. Para acessar, altere sua senha.',
  RESTRICTED_MFA: 'Acesso restrito somente a usuários com autenticação em duas etapas ativada.',
  RESTRICTED_TECHNICAL_MFA: 'Acesso restrito somente a usuários técnicos com autenticação em duas etapas ativada.',
  RESTRICTED_BLOCKED_BY_ADMIN: 'Seu acesso foi bloqueado pelo administrador.',
  RESTRICTED_OTHER: FALLBACK_MESSAGE,
  READ_ACCESS: 'Acesso somente leitura'
};

const ACTIONS: { [type: string]: RestrictionAction } = {
  RESTRICTED_PERIOD: RestrictionAction.SELECT_ANOTHER_ACCESS,
  RESTRICTED_IP: RestrictionAction.SELECT_ANOTHER_ACCESS,
  RESTRICTED_SESSION: RestrictionAction.LOGIN,
  RESTRICTED_UNIQUE_SESSION: RestrictionAction.LOGIN,
  RESTRICTED_DISCONNECTED_SESSION: RestrictionAction.LOGIN,
  RESTRICTED_TERM_OF_RESPONSIBILITY: RestrictionAction.ACCEPT_TERMS,
  RESTRICTED_IDENTITY_VERIFICATION: RestrictionAction.VERIFY_IDENTITY,
  RESTRICTED_PASSWORD_POLICY: RestrictionAction.CHANGE_PASSWORD,
  RESTRICTED_MFA: RestrictionAction.ENABLE_MFA,
  RESTRICTED_TECHNICAL_MFA: RestrictionAction.ENABLE_MFA,
  RESTRICTED_BLOCKED_BY_ADMIN: RestrictionAction.NONE,
  RESTRICTED_OTHER: RestrictionAction.SELECT_ANOTHER_ACCESS,
  READ_ACCESS: RestrictionAction.DISMISS
};

const SESSION_RESTRICTIONS = ['RESTRICTED_SESSION', 'RESTRICTED_UNIQUE_SESSION', 'RESTRICTED_DISCONNECTED_SESSION'];

/**
 * Traduz o erro de acesso (403) devolvido pelo backend na mensagem e na ação a oferecer ao usuário.
 * Um 403 sem tipo de restrição (ex.: falta de permissão no page-mapping) não bloqueia a aplicação.
 */
export function resolveRestriction(restriction: AccessRestriction, selectedContext?: SessionContext): RestrictionInfo {
  const informedType = restriction.restrictionType || restriction.classificationCode || restriction.type;

  if (!informedType) {
    return {
      type: restriction.code || 'ACCESS_DENIED',
      message: restriction.message || 'A Plataforma Betha negou esta operação.',
      action: RestrictionAction.DISMISS,
      requiresLogout: false
    };
  }

  const type = resolveType(informedType, restriction, selectedContext);
  const message = type === 'RESTRICTED_OTHER' && informedType !== 'RESTRICTED_OTHER'
    ? FALLBACK_MESSAGE
    : restriction.message || MESSAGES[type] || FALLBACK_MESSAGE;

  return {
    type,
    message,
    action: ACTIONS[type] || RestrictionAction.SELECT_ANOTHER_ACCESS,
    requiresLogout: SESSION_RESTRICTIONS.includes(type)
  };
}

/**
 * A verificação de identidade só se aplica quando a entidade exige e já possui usuários cadastrados, e
 * nunca a acessos técnicos; fora disso, é tratada como restrição genérica.
 */
function resolveType(type: string, restriction: AccessRestriction, selectedContext?: SessionContext): string {
  const metadata = restriction.detail && restriction.detail.metadata;
  if (type !== 'RESTRICTED_IDENTITY_VERIFICATION' || !metadata) {
    return type;
  }
  const technical = !!(selectedContext && selectedContext.technical);
  return metadata.verificationRequired && metadata.hasUsersRegistered && !technical ? type : 'RESTRICTED_OTHER';
}
