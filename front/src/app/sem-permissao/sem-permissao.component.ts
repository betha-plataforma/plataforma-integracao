import { Component } from '@angular/core';

@Component({
  selector: 'app-sem-permissao',
  template: `
    <div class="row align-items-center py-3">
      <div class="col">
        <h4 class="m-0">Sem permissão</h4>
      </div>
    </div>
    <p>Seu acesso atual não possui permissão para abrir esta funcionalidade.</p>
    <p>Peça a um administrador para ajustar o usuário ou grupo no Gerenciador de Acessos.</p>
  `
})
export class SemPermissaoComponent { }
