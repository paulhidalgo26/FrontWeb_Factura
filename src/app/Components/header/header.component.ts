import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiAuthAdminService } from 'src/app/services/apiAuth/api-auth-admin.service';
import { ApiAuthClientService } from 'src/app/services/apiAuth/api-auth-client.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  user!: User;

  constructor(
    public apiAuthClientService: ApiAuthClientService,
    public apiAuthAdminService: ApiAuthAdminService,
    private router: Router
  ){
    this.apiAuthClientService.us.subscribe(res => {
      this.user = res;
    });
    this.apiAuthAdminService.us.subscribe(res => {
      this.user = res;
    }); 
  }
  ngOnInit(): void {}

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  logout(){
    if(this.user.admin){
      this.apiAuthAdminService.logout();
    } else {
      this.apiAuthClientService.logout();
    }
    this.router.navigate(['/login']);
  }
}