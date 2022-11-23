import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponsavelService {
  private URL_API = `${environment.api.url}/responsavel`;

  constructor(private httpClient: HttpClient) { }
 
  getResponsaveis(): Promise<any> {
    return this.httpClient.get<any>(this.URL_API).toPromise();
  }
  
  save(data): Promise<any> {
    if (data.id) {
      return this.httpClient.put<any>(this.URL_API+'/'+data.id , {nome: data.nome, cpf: data.cpf}).toPromise();
    }
    return this.httpClient.post<any>(this.URL_API, {nome: data.nome, cpf: data.cpf}).toPromise();
  }

  delete(id): Promise<any> {
    return this.httpClient.delete<any>(this.URL_API+'/'+id).toPromise();
  }

}
