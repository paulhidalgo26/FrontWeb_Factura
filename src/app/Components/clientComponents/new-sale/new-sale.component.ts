//#region Imports,Var&Component
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { Sale } from 'src/app/models/sale';
import { SaleDetail } from 'src/app/models/saleDetail';
import { SaleDetailBill } from 'src/app/models/saleDetailBill';
import { User } from 'src/app/models/user';
import { ApiAuthClientService } from 'src/app/services/apiAuth/api-auth-client.service';
import { ApiSaleService } from 'src/app/services/apiSale/api-sale.service';
import { Response } from 'src/app/models/response';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogClientsComponent } from './dialogClients/dialogClients.component';
import { DialogProductsComponent } from './dialogProducts/dialogProducts.component';
import { Client } from 'src/app/models/client';
import { DialogSaleConfirmation } from './dialogSaleConfirmation/dialogSaleConfirmation.component';
import { DataService } from 'src/app/services/data/data.service';

var newSale: Sale;
var saleDetails: SaleDetail[] = [];
var saleDetailsBill: SaleDetailBill[] = [];

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.scss']
})

//#endregion
export class NewSaleComponent implements OnInit {
  //#region Variables  
  public user!: User;
  public actualClient: Client = {
    id: 1, name: "finalClient", cedula: "", email: " ",
    password: '',
    sales: []
  };
  public actualProduct!: Product;
  public saleDetailsTable: SaleDetailBill[] = [];

  public kebab: Sale = {
    iduserClient: 45,
    saleDetails: []
  }
  public tableBillColumns: string[] = 
  ["Name", "Qty.", "Subtotal", "Options"];

  public productForm = this.formBuilder.group({
    'ProductName': [{value: '', disabled: true}, Validators.required],
    'ProductQuantity': [{value: 0, disabled: true}, Validators.required],
    'ProductTotal': [{value: 0, disabled: true}, Validators.required]
  })
  public clientForm = this.formBuilder.group({
    'ClientID': [{value: 'Final Client', disabled: true}, Validators.required],
    'ClientName': [{value: 'Final Client', disabled: true}, Validators.required],
    'ClientCedula': [{value: 'Final Client', disabled: true}, Validators.required],
    'ClientEmail': [{value: 'Final Client', disabled: true}, Validators.required]
  })
  //#endregion
  //#region Constructor&OnInit
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private apiAuthClientService: ApiAuthClientService,
    private apiSale: ApiSaleService,
    private router: Router,
    private data: DataService
  ) { 
    this.apiAuthClientService.us.subscribe(res => {
      this.user = res;
    });
  }
  ngOnInit(): void {
    this.updateBillTable();
  }
  //#endregion
  //#region openDialog
  openClientDialog(){
    const dialogRef = this.dialog.open(DialogClientsComponent, {
      width: "600px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.selectClient(result.data);
      }
    })
  }
  openProductDialog(){
    const dialogRef = this.dialog.open(DialogProductsComponent, {
      width: "650px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.selectProduct(result.data);
      }
    })
  }
  openConfirmDialog(){
    const dialogRef = this.dialog.open(DialogSaleConfirmation, {
      width: "600px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.data === true){
          this.addSale();
        }
      }})
  }
  //#endregion
  //#region ClientSelected
  selectClient(clientSelected: Client){
    this.clientForm = this.formBuilder.group({
      'ClientID': [{value: clientSelected.id, disabled: true},  Validators.required],
      'ClientName': [{value: clientSelected.name, disabled: true},  Validators.required],
      'ClientCedula': [{value: clientSelected.cedula, disabled: true}, Validators.required],
      'ClientEmail': [{value: clientSelected.email, disabled: true}, Validators.required],
        })
    this.actualClient = clientSelected;
  }
  finalClient(){
    this.clientForm = this.formBuilder.group({
      'ClientID': [{value: 'Final Client', disabled: true},  Validators.required],
      'ClientName': [{value: 'Final Client', disabled: true},  Validators.required],
      'ClientCedula': [{value: 'Final Client', disabled: true}, Validators.required],
      'ClientEmail': [{value: 'Final Client', disabled: true}, Validators.required],
        })
    this.actualClient.id = 1;
  }
  //#endregion
  //#region Product Selected
  selectProduct(productSelected: Product){
    this.productForm = this.formBuilder.group({
      'ProductName': [{value: productSelected.name, disabled: true},  Validators.required],
      'ProductQuantity': [{value: 1, disabled: false},  Validators.required],
      'ProductTotal': [{value: productSelected.unitPrice, disabled: true}, Validators.required]
        })
    this.actualProduct = productSelected;
  }
  calculateProductTotal(qty: String){
    if(Number(qty) >= 1 && Number(qty) <= this.actualProduct.quantity){
      this.productForm = this.formBuilder.group({
        'ProductQuantity': [qty],
        'ProductTotal': [{value: this.actualProduct.unitPrice * Number(qty), disabled: true}, Validators.required]
      });
    } else{
      if(Number(qty) === 0){
        this.productForm = this.formBuilder.group({
          'ProductQuantity': [1],
          'ProductTotal': [{value: this.actualProduct.unitPrice * 1, disabled: true}, Validators.required]
        });
      }
      if(Number(qty) > this.actualProduct.quantity){
        this.productForm = this.formBuilder.group({
          'ProductQuantity': [this.actualProduct.quantity],
          'ProductTotal': [{value: this.actualProduct.unitPrice * this.actualProduct.quantity, disabled: true}, Validators.required]
        });
      }
    }
  }
  //#endregion
  //#region Bill
  addSaleDetail(qty: String){
    if(!this.checkIfSaleDetailRepeats(Number(qty))){
      saleDetails.push({IDProduct: this.actualProduct.id, Quantity: Number(qty)});
      saleDetailsBill.push({ID: this.actualProduct.id, Name: this.actualProduct.name, 
        Quantity: Number(qty), Subtotal: this.actualProduct.unitPrice * Number(qty)})
    }
    this.updateBillTable();
  }
  removeSaleDetail(productRemoved: SaleDetailBill){
    var cont: number = 0;
    saleDetails.forEach(element => {
      if(element.IDProduct === productRemoved.ID){
        saleDetails.splice(cont, 1);
        saleDetailsBill.splice(cont, 1);
      } else {
        cont++;
      }
    });
    this.updateBillTable();
  }
  checkIfSaleDetailRepeats(qty: number): boolean{
    var result = false;
      saleDetailsBill.forEach(element => {
        if(element.ID === this.actualProduct.id){
          result = true;
          if(this.checkProductQtyBill(qty, element)){
            element.Quantity += qty;
            element.Subtotal += this.actualProduct.unitPrice * qty
        }
        }
      });
      if(result){
        saleDetails.forEach(element => {
          if(element.IDProduct === this.actualProduct.id && element.Quantity + qty <= this.actualProduct.quantity){
            element.Quantity += qty;
          }
        });
      }
      return result;
  }
  checkProductQtyBill(qty: number, saleDetail: SaleDetailBill): boolean{
    var result = true;
          if((saleDetail.Quantity + qty) > this.actualProduct.quantity){
            result = false;
          }
    return result;
  }
  updateBillTable(){
    this.saleDetailsTable.reverse();
    this.saleDetailsTable = [...saleDetailsBill];
    this.saleDetailsTable.reverse();
  }
  addSale(){
    newSale = { iduserClient: this.actualClient.id, saleDetails: saleDetails};
    this.apiSale.add(newSale).subscribe((r: Response) => 
      {
          if(r.success){
            saleDetailsBill = [];
            this.saleDetailsTable = [];
            saleDetails = [];
            this.updateBillTable();
            this.data.sendSale(newSale);
            this.router.navigate(["/sale-completed"]);
          } else{
          }
      });
  }
  getTotal(){
    return saleDetailsBill.map(t => t.Subtotal).reduce((acc, value) => acc + value, 0);
  }
  //#endregion 
}