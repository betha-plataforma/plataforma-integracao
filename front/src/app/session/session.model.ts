/**
 * Visão da sessão entregue pelo backend (BFF). Não contém access token nem refresh token.
 */
export interface SessionUser {
  readonly id: string;
  readonly name?: string;
  readonly email?: string;
  readonly photoUrl?: string;
}

export interface SessionContext {
  readonly accessId: string;
  readonly description: string;
  readonly complement?: string;
  readonly context: string;
  readonly database?: string;
  readonly entity?: string;
  readonly admin: boolean;
  readonly technical: boolean;
  readonly accepted: boolean;
}

export type Capabilities = { [funcionalidade: string]: { [acao: string]: boolean } };

export interface Session {
  readonly user: SessionUser;
  readonly contexts: SessionContext[];
  readonly selectedContext?: SessionContext;
  readonly systemId: number;
  readonly exercise?: string;
  readonly managerUrl?: string;
  readonly capabilities: Capabilities;
}

export interface AccessRestriction {
  readonly code?: string;
  readonly message?: string;
  readonly restrictionType?: string;
  readonly classificationCode?: string;
  readonly type?: string;
  readonly detail?: {
    readonly metadata?: {
      readonly verificationRequired?: boolean;
      readonly hasUsersRegistered?: boolean;
    };
  };
  readonly httpStatus?: number;
}
