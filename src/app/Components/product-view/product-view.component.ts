import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { ActualUser } from 'src/app/resources/ActualUser';
import { ApiProductService } from 'src/app/services/apiProducts/api-product.service';
import { DialogProductComponent } from './dialog-product/dialog-product.component';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  public list!: Product[];
  public tableColumns: string[] = 
  ["Name", "Genre", "Quantity", "Unit Price"]
  public dataSource!: MatTableDataSource<Product>;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;   
  public user: User = {email: '', token: '', id: 0, admin: false};

  constructor(private apiProduct: ApiProductService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();

      if(ActualUser.User != null){
        this.user = ActualUser.User;
        if(this.user.admin){
           this.tableColumns = ["Name", "Genre", "Quantity", "Unit Price", "Options"]
        }
      }    

  }
  getProducts(){
    this.apiProduct.get().subscribe( response => {
      this.list = response.data;
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;  
    })
  }
  searchProducts(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectProduct(productSelected: Product){
    const dialogRef = this.dialog.open(DialogProductComponent, {
      width: "600px",
      data: {
        action: true,
        product: productSelected
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getProducts(); // Firstly here I called "getTableData" then I thought that calling "ngOnInit" as it will refresh the full component.
    });
  }
  addProduct(){
    const empty: Product ={id: 0, genre: '', name: '', quantity: 0, cost: 0, unitPrice: 0, imageURL: ''};
    const dialogRef = this.dialog.open(DialogProductComponent, {
      width: "600px",
      data: {
        action: false,
        product: empty
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getProducts(); // Firstly here I called "getTableData" then I thought that calling "ngOnInit" as it will refresh the full component.
    });
  }
}