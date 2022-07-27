import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/models/client';
import { Product } from 'src/app/models/product';
import { Sale } from 'src/app/models/sale';
import { SaleDetailBill } from 'src/app/models/saleDetailBill';
import { SaleDetails } from 'src/app/models/saleDetails';
import { ApiClientsService } from 'src/app/services/apiClients/api-clients.service';
import { ApiProductService } from 'src/app/services/apiProducts/api-product.service';
import { ApiSaleDetailsService } from 'src/app/services/apiSaleDetails/api-sale-details.service';
import { DataService } from 'src/app/services/data/data.service';
var numberfac=80;
@Component({
  selector: 'app-sale-completed',
  templateUrl: './sale-completed.component.html',
  styleUrls: ['./sale-completed.component.scss']
})
export class SaleCompletedComponent implements OnInit {

  public clientForm = this.formBuilder.group({
    'ClientID': [{value: 'Consum. Final', disabled: true}, Validators.required],
    'ClientName': [{value: 'Consum. Final', disabled: true}, Validators.required],
    'ClientCedula': [{value: 'Consum. Final', disabled: true}, Validators.required],
    'ClientEmail': [{value: 'Consum. Final', disabled: true}, Validators.required]
  })
  public tableColumns: string[] = 
    ["ID", "Name", "Quantity","Price", "Subtotal"];



    public billForm = this.formBuilder.group({
      'subtotal': [{value: '0', disabled: true}],
      'iva': [{value: '0', disabled: true}]
    })

    public billForm2 = this.formBuilder.group({
      'total': [{value: '0', disabled: true}],
    })

  sale!: Sale;
  total = 0;
  subscription!: Subscription;
  public list: SaleDetailBill[] = [];
  public dataSource!: MatTableDataSource<SaleDetailBill>;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;   
  numberfac:number;
  date = new Date();
  fecha: string;
  constructor(private data: DataService,
    private formBuilder: FormBuilder,
    private apiProducts: ApiProductService,
    private apiClients: ApiClientsService
    ) {
      this.numberfac= numberfac
      this.fecha=String(this.date.getDate()).padStart(2, '0') + '/' + String(this.date.getMonth() + 1).padStart(2, '0') + '/' +this.date.getFullYear();
     }

  ngOnInit(): void {
    this.subscription = this.data.currentLastSale.subscribe(message => this.sale = message)
    this.fillTableandGetSpecifiedProducts(this.sale);
    this.getSpecifiedClient(this.sale);
  }

fillTableandGetSpecifiedProducts(details: Sale){
    details.saleDetails.forEach(detail => {
        this.apiProducts.getSpecifiedProduct(detail.IDProduct).subscribe(response => {
            var product: Product = response.data[0];
            this.list.push({ID: detail.IDProduct, Name: product.name, Quantity: detail.Quantity,
            Price:product.unitPrice, Subtotal: detail.Quantity * product.unitPrice});
            this.total += product.unitPrice * detail.Quantity;
            this.dataSource = new MatTableDataSource(this.list);
            this.dataSource.paginator = this.paginator;  
            this.getTotal();
        });        
    });
}
getSpecifiedClient(sale: Sale){
  this.apiClients.getSpecifiedClient(sale.iduserClient).subscribe(response => {
      this.clientForm = this.formBuilder.group({
          'ClientID': [{value: response.data[0].id, disabled: true}],
          'ClientName': [{value: response.data[0].name, disabled: true}],
          'ClientCedula': [{value: response.data[0].cedula, disabled: true}],
          'ClientEmail': [{value: response.data[0].email, disabled: true}]
        })
  })
}
getTotal(){
  
  this.billForm = this.formBuilder.group({
    'subtotal': [{value: (this.total).toFixed(2) + " $", disabled: true}],
    'iva': [{value: (this.total*0.12).toFixed(2) + " $", disabled: true}]
   
 })
 
 this.billForm2 = this.formBuilder.group({
  'total': [{value: (this.total + this.total*0.12).toFixed(2) + " $", disabled: true}],

 
})
}
salir(){
  numberfac++;
}

}