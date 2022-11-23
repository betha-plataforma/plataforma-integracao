export interface EmailsUsuario {
    readonly primario: string;
    readonly secundario: string;
}
export interface Usuario {
    readonly id: string;
    readonly nome: string;
    readonly sexo?: 'M' | 'F';
    readonly celular?: string;
    readonly dataNascimento?: string;
    readonly dataCadastro?: null;
    readonly foto?: string;
    readonly emails?: EmailsUsuario;
}
