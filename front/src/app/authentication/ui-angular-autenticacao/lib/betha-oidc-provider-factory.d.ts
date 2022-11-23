import { OAuthConfig } from '@betha-plataforma/oauth';
declare type OAuthConfigAutoProvider = Pick<OAuthConfig, Exclude<keyof OAuthConfig, 'provider'>>;
export declare function bethaOIDCProviderFactory(config: OAuthConfigAutoProvider): OAuthConfig;
export {};
