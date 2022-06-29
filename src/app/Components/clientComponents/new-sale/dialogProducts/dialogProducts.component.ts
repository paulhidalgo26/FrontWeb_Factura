//#region Imports
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { Product } from "src/app/models/product";
import { ApiProductService } from "src/app/services/apiProducts/api-product.service";
//#endregion
@Component({
    templateUrl: "./dialogProducts.component.html",
    styleUrls: ["./dialogProducts.component.scss"]
})
export class DialogProductsComponent implements OnInit {

  public tableProductsColumns: string[] = 
  ["ID", "Name", "Genre", "Quantity", "Unit Price", "Add"];
  public productList: Product[] = [];
  public filterList: Product[] = [];

  public dataSource!: MatTableDataSource<Product>;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;   

  constructor(
        public dialogRef: MatDialogRef<DialogProductsComponent>,
        private apiProduct: ApiProductService
    ){ 
   }

  ngOnInit(): void {
    this.getProducts();
  }
  close(){
    this.dialogRef.close();
  }

  getProducts(){
    this.apiProduct.get().subscribe( response => {
      response.data.forEach((element: Product) => {
        if(element.quantity != 0){
          this.productList.push(element);
        }
      });         
        this.filterList = this.productList;
        this.dataSource = new MatTableDataSource(this.filterList);        
        this.dataSource.paginator = this.paginator;  
    })
  }
  searchProduct(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  selectProduct(productSelected: Product){
    this.dialogRef.close({data: productSelected});
  }
}