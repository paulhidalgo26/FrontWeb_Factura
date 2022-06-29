//#region Imports
import { Component, Inject, OnInit, Type } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { productRequest } from 'src/app/models/productRequest';
import { ApiProductService } from "src/app/services/apiProducts/api-product.service";
import {MatSnackBar, MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
//#endregion

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent implements OnInit {

  private _product!: Product;
  private _productEdited!: productRequest;
  public title: string = '';
  public btnTitle: string = '';

  public productForm = this.formBuilder.group({
    "Name": [{value: '', disabled: false}, [Validators.required, Validators.minLength(1)]],
    "Genre": [{value: '', disabled: false}, [Validators.required, Validators.minLength(1)]],
    'Quantity':  [{value: 0, disabled: false}, Validators.required],
    'UnitPrice':  [{value: 0, disabled: false}, [Validators.required, Validators.minLength(1)]],
    'Cost':  [{value: 0, disabled: false}, [Validators.required, Validators.minLength(1)]],
    "ImageURL": [{value: '', disabled: false}, [Validators.required, Validators.minLength(1)]]
  });
  constructor(private formBuilder: FormBuilder,
    private apiProduct: ApiProductService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if(this.data.action){
      this.getProductByID(this.data.product.id);
      this.title = "Product #" + this.data.product.id;
      this.btnTitle = "Edit";
    } else {
      this.title = "New product";
      this.btnTitle = 'Add';
    }
  }
  getProductByID(id: number){
    this.apiProduct.getSpecifiedProduct(id).subscribe(response =>{
      this._product = response.data[0];
      this.showProductInfo(response.data[0]);
    })
  }
  showProductInfo(product: Product){
    this.productForm = this.formBuilder.group({
      "Name": [{value: product.name, disabled: false}, [Validators.required, Validators.minLength(1)]],
      "Genre": [{value: product.genre, disabled: false}, [Validators.required, Validators.minLength(1)]],
      'Quantity':  [{value: product.quantity, disabled: false}, [Validators.required, Validators.minLength(1)]],
      'UnitPrice':  [{value: product.unitPrice, disabled: false}, [Validators.required, Validators.minLength(1)]],
      'Cost':  [{value: product.cost, disabled: false}, [Validators.required, Validators.minLength(1)]],
      "ImageURL": [{value: product.imageURL, disabled: false}, [Validators.required, Validators.minLength(1)]]
    })
  }
  buttonAction(){
    if(this.data.action){
      this.editProduct();
    } else {
      this.addProduct();
    }
  }
  addProduct(){
    this._productEdited = this.productForm.value;
    
    this.apiProduct.addProduct(this._productEdited).subscribe(response => {
      if(response.success){
        this._snackBar.open("Product added", "",{ duration: 1000 });
        this.dialogRef.close();
      }
  });
  }
  editProduct(){
    this._productEdited = this.productForm.value;
    this.apiProduct.editProduct(this.data.product.id, this._productEdited).subscribe(response => {
        if(response.success){
          this._snackBar.open(response.message + "ly", "",{ duration: 1000 });
          this.dialogRef.close();
        }
    });
  }
  deleteProduct(){
    this.apiProduct.deleteProduct(this.data.product.id).subscribe( response =>{
      if(response.success){
        this._snackBar.open(response.message + "", "",{ duration: 1000 });
        this.dialogRef.close();
      } else {
        this._snackBar.open("This product cannot be deleted", "",{ duration: 1000 });
      }
    }
  );
  }
}
