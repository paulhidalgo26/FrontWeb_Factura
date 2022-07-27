import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAuthClientService } from 'src/app/services/apiAuth/api-auth-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    public apiAuthClientService: ApiAuthClientService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }
  login(){
    this.apiAuthClientService.login(this.loginForm.value).subscribe(
      response => {
        if(response.success){
          this.router.navigate(["/"]);
          }
      });
  }
}