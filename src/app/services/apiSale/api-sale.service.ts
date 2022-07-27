import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../../models/response'
import { Sale } from 'src/app/models/sale';
import { AthURL } from 'src/app/resources/AthURL';

const httpOptions = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApiSaleService {
  url: string = AthURL.SALE;

  constructor(private _http: HttpClient) { }

  add(sale: Sale): Observable<Response>{
    return this._http.post<Response>(this.url, sale, httpOptions);
  }
  get(){
    return this._http.get<Response>(this.url, httpOptions);
  }
  getByUserID(user: number){
    return this._http.get<Response>(this.url + "/" + user, httpOptions);
  }
}