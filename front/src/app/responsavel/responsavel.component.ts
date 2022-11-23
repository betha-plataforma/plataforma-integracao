import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResponsavelService } from "./responsavel.service";

@Component({
  selector: 'app-resposavel',
  templateUrl: './responsavel.component.html',
  styleUrls: ['./responsavel.component.scss']
})
export class ResponsavelComponent implements OnInit {
  
  @ViewChild('registerModal') private registerModal: any;
  @ViewChild('confirmModal') private confirmModal: any;

  public responsavel = {id: '', nome: '', cpf: ''};
  public responsaveis = [];
  public loading = true;
  public error;

  constructor(
    private modalService: NgbModal,
    private responsavelService: ResponsavelService
    ) { }

  ngOnInit() {

    this.getData();

  }

  getData(): void{

    this.loading = true;

    this.responsavelService.getResponsaveis().then( data => {
      this.responsaveis = data;
      this.loading = false;
    });

  }

  openModal(...responsavel): void {

    this.responsavel = {id: '', nome: '', cpf: ''};
    this.error = null;

    if (responsavel.length) {
      this.responsavel = {id: responsavel[0].id, nome: responsavel[0].nome, cpf: responsavel[0].cpf};
    }

    this.modalService.open(this.registerModal, { size: 'lg', animation: true });
  }

  removeModal(id): void {
    this.responsavel.id = id;
    this.modalService.open(this.confirmModal);
  }

  save(){
    this.responsavelService.save(this.responsavel).then( data => {
      this.modalService.dismissAll();
      this.getData();
    }, (data) => {
      this.error = data.error;
    });
  }
  
  delete(){
    this.responsavelService.delete(this.responsavel.id).then( data => {
      this.modalService.dismissAll();
      this.getData();
    });
  }

}
