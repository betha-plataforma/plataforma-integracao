import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContribuinteService {
  private URL_API = `${environment.api.url}/contribuinte`;

  constructor(private httpClient: HttpClient) { }

  getContribuintes(params): Promise<any> {
    return this.httpClient.get<any>(this.URL_API, {params}).toPromise();
  }
}
