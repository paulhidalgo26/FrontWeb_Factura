//#region Imports
import { Component, OnInit, ViewChild } from "@angular/core";

import { MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { Product } from "src/app/models/product";
import { ApiProductService } from "src/app/services/apiProducts/api-product.service";
//#endregion
@Component({
    templateUrl: "./dialogSaleConfirmation.component.html",
    styleUrls: ["./dialogSaleConfirmation.component.scss"]
})
export class DialogSaleConfirmation implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DialogSaleConfirmation>,
        private apiProduct: ApiProductService
    ){ 
    }

    ngOnInit(): void {
    }

    payOffBill(){
        this.dialogRef.close({data: true});
    }
    cancelBill(){
        this.dialogRef.close({data: false});
    }
}
