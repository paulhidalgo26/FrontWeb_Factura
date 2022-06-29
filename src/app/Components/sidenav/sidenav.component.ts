import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActualUser } from 'src/app/resources/ActualUser';
import { ApiAuthAdminService } from 'src/app/services/apiAuth/api-auth-admin.service';
import { ApiAuthClientService } from 'src/app/services/apiAuth/api-auth-client.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  user!: User;

  constructor(
    public apiAuthClientService: ApiAuthClientService,
    public apiAuthAdminService: ApiAuthAdminService
  ){
    this.apiAuthClientService.us.subscribe(res => {
      this.user = res;
      ActualUser.User = this.user;
    });
    this.apiAuthAdminService.us.subscribe(res => {
      this.user = res;
      ActualUser.User = this.user;
    }); 
  }
  ngOnInit(): void {
  }
}