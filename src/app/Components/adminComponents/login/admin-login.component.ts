import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActualUser } from 'src/app/resources/ActualUser';
import { ApiAuthAdminService } from 'src/app/services/apiAuth/api-auth-admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class adminLoginComponent implements OnInit {

  public loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    public apiAuthAdminService: ApiAuthAdminService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }
  login(){
    this.apiAuthAdminService.login(this.loginForm.value).subscribe(
      response => {
          if(response.success){
              this.router.navigate(["/home"]);
          }
      });
  }
}