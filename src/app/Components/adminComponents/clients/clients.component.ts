import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { User } from 'src/app/models/user';
import { ActualUser } from 'src/app/resources/ActualUser';
import { ApiClientsService } from 'src/app/services/apiClients/api-clients.service';
import { DialogClientsComponent } from '../../clientComponents/new-sale/dialogClients/dialogClients.component';
import { DialogClientAddEditComponent } from './dialog-client/dialog-client.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {


  constructor(private apiClients: ApiClientsService, private dialog: MatDialog) { }

  public list!: Client[];
  public tableColumns: string[] = 
  ["ID", "Name", "Email", "Cedula", "Options"]

  ngOnInit(): void {
    this.getClients();

  }
  getClients(){
    this.apiClients.get().subscribe( response => {
      this.list = response.data;
      this.list = this.list.filter(a => a.id > 1);
    })
  }
  selectClient(client: User){
    const dialogRef = this.dialog.open(DialogClientAddEditComponent, {
      width: "490px",
      data: {
        action: true,
        client: client.id
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getClients(); // Firstly here I called "getTableData" then I thought that calling "ngOnInit" as it will refresh the full component.
    });
  }
  addClient(){
    const dialogRef = this.dialog.open(DialogClientAddEditComponent, {
      width: "500px",
      data: {
        action: false,
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getClients(); // Firstly here I called "getTableData" then I thought that calling "ngOnInit" as it will refresh the full component.
    });
  }
}
