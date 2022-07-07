import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { ApiAuthClientService } from './services/apiAuth/api-auth-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Facturacion';
  user!: User;
  sideBarOpen = false;

  constructor(
    private router: Router
  ){
  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }
  
}
