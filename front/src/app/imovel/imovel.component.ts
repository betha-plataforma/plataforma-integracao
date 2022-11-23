import { Component, OnInit } from '@angular/core';
import { ImovelService } from './imovel.service';
import {AutenticacaoContextService} from '../authentication/ui-angular-autenticacao';

@Component({
  selector: 'app-imovel',
  templateUrl: './imovel.component.html',
  styleUrls: ['./imovel.component.scss']
})
export class ImovelComponent implements OnInit {

  public imoveis = [];
  public tags = [];
  public filter;
  public term;
  public orderBy = {field: '', sort: 'desc'};
  public loading = true;
  public paginationControl = { page: 1, pageSize: 20, hasNext: false };

  public isVerificado = false;

  constructor(
    private imovelService: ImovelService,
    private autenticacaoContextService: AutenticacaoContextService,
  ) { }

  ngOnInit() {

    this.getData();

    this.autenticacaoContextService.getInformacaoUsuario().subscribe(usuario => {
      this.imovelService.isVerificado(usuario.id).then(data => {
        this.isVerificado = data.userVerified;
      });
    });

  }
  

  getData(): void{

    this.loading = true;

    const params = {
      "limit": this.paginationControl.pageSize.toString(),
      "offset": (this.paginationControl.page - 1) * this.paginationControl.pageSize,
      "sort": this.getSort(),
      "filter": this.getFilters()
    };

    this.imovelService.getImoveis(params).then( data => {
      this.imoveis = data.content;
      this.paginationControl.hasNext = data.hasNext;
      this.loading = false;
    });

  }

  private getSort(){
    return this.orderBy.field ? this.orderBy.field + ' ' +  this.orderBy.sort : "";
  }

  private getFilters(){
    const filters = [];
    this.tags.forEach(tag => {
      filters.push(`responsavel.nome like "%${tag}%"`);
    });

    return filters.length ? `(${filters.join(' and ')})` : "";

  }

  search(){
    this.tags.push(this.term);
    this.term = '';

    this.resetPagination();
    this.getData();
  }

  deleteTag(index): void {
    this.tags.splice(index, 1);
    
    this.resetPagination();
    this.getData();
  }

  sort(column){
    this.orderBy.sort = this.orderBy.sort === 'asc' ? 'desc' : 'asc';
    this.orderBy.field = column;
    
    this.resetPagination();
    this.getData();
  }

  resetPagination(){
    this.paginationControl.page = 1;
  }

  nextPage(){
    this.paginationControl.page++
    this.getData();
  }
  
  prevPage(){
    this.paginationControl.page--
    this.getData();
  }

}
