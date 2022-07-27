import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AthURL } from 'src/app/resources/AthURL';
import { Response } from '../../models/response'

const httpOptions = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApiSaleDetailsService {
  url: string = AthURL.SALE_DETAILS;

  constructor(private _http: HttpClient) { }

  getSpecifyDetails(id: number): Observable<Response>{
    return this._http.get<Response>(this.url + "/" + id, httpOptions);
  }
}
