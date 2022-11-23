import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {
  private URL_API = `${environment.api.url}/imovel`;
  private URL_USER = `${environment.api.url}/usuario`;

  constructor(private httpClient: HttpClient) { }

  getImoveis(params): Promise<any> {
    return this.httpClient.get<any>(this.URL_API, {params}).toPromise();
  }

  isVerificado(user): Promise<any> {
    return this.httpClient.get<any>(`${this.URL_USER}/${user}/verified`).toPromise();
  }
}
