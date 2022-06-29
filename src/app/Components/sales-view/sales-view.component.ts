import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sale } from 'src/app/models/sale';
import { ActualUser } from 'src/app/resources/ActualUser';
import { ApiSaleService } from 'src/app/services/apiSale/api-sale.service';
import { DialogSaleComponent } from './dialogSale/dialogSale.component';

@Component({
  selector: 'app-sales-view',
  templateUrl: './sales-view.component.html',
  styleUrls: ['./sales-view.component.scss']
})
export class SalesViewComponent implements OnInit {

  public list!: Sale[];
  public tableColumns: string[] = 
  ["ID", "Date", "IDUserClient", "Total", "Select"]

  public dataSource!: MatTableDataSource<Sale>;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;   

  constructor(private apiSales: ApiSaleService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSales();
  }

  getSales(){
    if(ActualUser.User.admin){
      this.apiSales.get().subscribe( response => {
        this.list = response.data;
        this.dataSource = new MatTableDataSource(this.list);
        this.dataSource.paginator = this.paginator;  
      })
    } else {
      this.apiSales.getByUserID(ActualUser.User.id).subscribe( response => {
        this.list = response.data;
        this.dataSource = new MatTableDataSource(this.list);
        this.dataSource.paginator = this.paginator;  
      })
    }
  }
  selectSale(selectedSale: Sale){
    const dialogRef = this.dialog.open(DialogSaleComponent, {
      width: "600px",
      data: {
        sale: selectedSale
      }
    });
  }
  searchSales(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
