import { Injectable } from '@angular/core';
import { BehaviorSubject, last } from 'rxjs';
import { Sale } from 'src/app/models/sale';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  sale: Sale = {
    iduserClient: 0,
    saleDetails: []
  }
  private saleSource = new BehaviorSubject(this.sale);
  currentLastSale = this.saleSource.asObservable();

  constructor() { }

  sendSale(lastSale: Sale){
    this.saleSource.next(lastSale);
  }
}