//#region Imports
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { Client } from "src/app/models/client";
import { ApiClientsService } from "src/app/services/apiClients/api-clients.service";
//#endregion
@Component({
    templateUrl: "./dialogClients.component.html",
    styleUrls: ["./dialogClients.component.scss"]
})
export class DialogClientsComponent implements OnInit{

    public list: Client[] = [];
    public tableColumns: string[] = 
    ["ID", "Name", "Email", "Cedula", "Select"]
    public dataSource!: MatTableDataSource<Client>;
    @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;   

    constructor(
        public dialogRef: MatDialogRef<DialogClientsComponent>,
        private apiClients: ApiClientsService
    ){

    }
    ngOnInit(): void{
        this.getClients();
    }

    close(){
        this.dialogRef.close();
    }

    getClients(){
        this.apiClients.get().subscribe( response => {
            response.data.forEach((element: Client) => {
                if(element.id != 1){
                  this.list.push(element);
                }
              });
            this.dataSource = new MatTableDataSource(this.list);
            this.dataSource.paginator = this.paginator;  
          })
    }
    searchClient(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
    }
    selectClient(clientSelected: Client){
        this.dialogRef.close({data: clientSelected})
    }
}