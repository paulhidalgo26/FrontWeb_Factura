import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { empty } from 'rxjs';
import { Client } from 'src/app/models/client';
import { EditClientRequest } from 'src/app/models/editClientRequest';
import { ApiClientsService } from 'src/app/services/apiClients/api-clients.service';

@Component({
  selector: 'app-dialog-client',
  templateUrl: './dialog-client.component.html',
  styleUrls: ['./dialog-client.component.scss']
})
export class DialogClientAddEditComponent implements OnInit {

  public clientForm = this.formBuilder.group({
    "name": [{value: '', disabled: false}, [Validators.required, Validators.minLength(1)]],
    "email": [{value: '', disabled: true}],
    'password':  [{value: '', disabled: true}],
    'cedula': [{value: 'empty', disabled: true}]
    });
  public title: string = "";
  public btnTitle: string = "";
  public client!: Client;
  private _editClient: EditClientRequest = {name: ""};

  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogClientAddEditComponent>,
    private apiClient: ApiClientsService) { }

  ngOnInit(): void {
    if(this.data.action){
      this.getClientByID(this.data.client);
      this.title = "Client #" + this.data.client;
      this.btnTitle = "Edit";
    } else {
      this.title = "Add new client";
      this.btnTitle = "Add";
      this.clientForm = this.formBuilder.group({
        "name": [{value: '', disabled: false}, [Validators.required, Validators.minLength(1)]],
        "email": [{value: '', disabled: false},  [Validators.required, Validators.minLength(1)]],
        'password': [{value: '', disabled: false},  [Validators.required, Validators.minLength(1)]],
        'cedula': [{value: '', disabled: false},  [Validators.required, Validators.minLength(1)]]
        });
    }
  }

  //#region EditClient
  getClientByID(id: number){
    this.apiClient.getSpecifiedClient(id).subscribe(response =>{
      this.client = response.data[0];
      this.showClientInfo(response.data[0]);
    })
  }
  showClientInfo(client: Client){
    this.clientForm = this.formBuilder.group({
      "name": [{value: client.name, disabled: false}, [Validators.required, Validators.minLength(1)]],
      "email": [{value: client.email, disabled: true}],
      'cedula':  [{value: client.cedula, disabled: true}]
    })
  }
  editClient(){
    this.client = this.clientForm.value;
    this._editClient.name = this.client.name;
    this.apiClient.editClient(this.data.client, this._editClient).subscribe(response => {
      if(response.success){
        this._snackBar.open(response.message + "", "",{ duration: 1000 });
        this.dialogRef.close();
      }
    });
  }
  //#endregion
  //#region AddClient
  addClient(){
   
    this.apiClient.addClient(this.clientForm.value).subscribe(response => {
      console.log('aaa')
      console.log(response)
      debugger;
      if(response.success){
        this._snackBar.open("New client added", "",{ duration: 1000 });
        this.dialogRef.close();
      } else {
        this._snackBar.open("Invalid cedula or email", "",{ duration: 1000 });
      }
    }, async error=>{
      console.log(error.error)
      if (error['error'].errors.cedula != undefined || error['error'].errors.cedula != null ){
        alert(error['error'].errors.cedula[0]);
        return;
      }

      if (error['error'].errors.password){
        alert(error['error'].errors.password[0]);
        return;
      }
      if (error['error'].errors.email){
        alert(error['error'].errors.email[0])
        return;
      }

     
      
    }) 
  }
  //#endregion
  buttonAction(){
    if(this.data.action){
      this.editClient();
    } else {
      this.addClient();
    }
  }
  deleteClient(){
    this.apiClient.deleteClient(this.data.client).subscribe(response =>{
      if(response.success){
        this._snackBar.open(response.message + "", "",{ duration: 1000 });
        this.dialogRef.close();
      } else {
        this._snackBar.open("This user cannot be deleted", "",{ duration: 1000 });
      }
    })
  }
}