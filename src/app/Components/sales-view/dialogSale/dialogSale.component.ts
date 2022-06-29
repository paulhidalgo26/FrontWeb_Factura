//#region Imports
import { Component, Inject, OnInit, ViewChild } from "@angular/core";

import { MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { SaleDetailBill } from "src/app/models/saleDetailBill";
import { ApiProductService } from "src/app/services/apiProducts/api-product.service";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiSaleDetailsService } from "src/app/services/apiSaleDetails/api-sale-details.service";
import { SaleDetails } from "src/app/models/saleDetails";
import { Product } from "src/app/models/product";
import { FormBuilder, Validators } from "@angular/forms";
import { ApiClientsService } from "src/app/services/apiClients/api-clients.service";
import { Client } from "src/app/models/client";
//#endregion

@Component({
    templateUrl: "./dialogSale.component.html",
    styleUrls: ["./dialogSale.component.scss"]
})
export class DialogSaleComponent implements OnInit{

    public detailsList: SaleDetails[] = [];
    public list: SaleDetailBill[] = [];
    public client!: Client;

    public tableColumns: string[] = 
    ["ID", "Name", "Quantity", "Subtotal"];

    public dataSource!: MatTableDataSource<SaleDetailBill>;
    @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;   

    public clientForm = this.formBuilder.group({
        'ClientID': [{value: '', disabled: true}],
        'ClientName': [{value: '', disabled: true}],
        'ClientCedula': [{value: '', disabled: true}],
        'ClientEmail': [{value: '', disabled: true}]
    })
    public billForm = this.formBuilder.group({
        'totalIVA': [{value: '0', disabled: true}]
      })
    constructor(
        public dialogRef: MatDialogRef<DialogSaleComponent>,
        private apiProducts: ApiProductService,
        private apiSaleDetails: ApiSaleDetailsService,
        private apiClients: ApiClientsService,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ){
    }
    ngOnInit(): void{
        this.getSpecifiedSaleDetails();  
        this.getSpecifiedClient();
        this.getTotal();
    }

    getSpecifiedSaleDetails(){
        this.apiSaleDetails.getSpecifyDetails(this.data.sale.id).subscribe(response => {
            this.detailsList = response.data;
            this.fillTableandGetSpecifiedProducts(this.detailsList);         
        });
    }
    fillTableandGetSpecifiedProducts(details: SaleDetails[]){
        details.forEach(detail => {
            this.apiProducts.getSpecifiedProduct(detail.idproduct).subscribe(response => {
                var product: Product = response.data[0];
                this.list.push({ID: detail.idproduct, Name: product.name, Quantity: detail.quantity,
                Subtotal: detail.quantity * product.unitPrice});
                this.dataSource = new MatTableDataSource(this.list);
                this.dataSource.paginator = this.paginator;  
            });        
        });
    }

    getSpecifiedClient(){
        this.apiClients.getSpecifiedClient(this.data.sale.iduserClient).subscribe(response => {
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
        'totalIVA': [{value: this.data.sale.total + " $", disabled: true}]
      }) 
    }
    close(){
        this.dialogRef.close();
    }
}